import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CandyLocation, StoreImage } from './entities';
import { Repository } from 'typeorm';
import { CreateCandyLocationDto, StoreAreaDto, UpdateCandyLocationDto } from './dto';
import { User } from '../auth/entities/user.entity';


function mapCandyLocation(location: CandyLocation) {
  const [longitude, latitude] = location.coordinates.coordinates;

  return {
    id: location.id,
    title: location.title,
    description: location.description,
    latitude,
    longitude,
    quantity: location.quantity,
    isActive: location.isActive,
    createdAt: location.createdAt,
    updatedAt: location.updatedAt,
    storeImages: location.storeImages,
  };
}


@Injectable()
export class StoreService {
  private readonly logger = new Logger('StoreService');

  constructor(

    @InjectRepository(CandyLocation)
    private readonly candyLocationRepository: Repository<CandyLocation>,

  ) { }


  async createCandyLocation(createCandyLocationDto: CreateCandyLocationDto, user: User) {
    try {
      const { latitude, longitude, ...candyLocationDetails } = createCandyLocationDto;

      const candyLocation = this.candyLocationRepository.create({
        ...candyLocationDetails,

        user,
        coordinates: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      });
      const location = await this.candyLocationRepository.save(candyLocation);
      return mapCandyLocation(location);
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async updateCandyLocation(id: number, updateCandyLocationDto: UpdateCandyLocationDto) {

    const candyLocation = await this.candyLocationRepository.preload({ id: id, ...updateCandyLocationDto })

    if (!candyLocation) throw new NotFoundException(`CandyLocation with id: ${id} not found`);

    await this.candyLocationRepository.save(candyLocation)

    return mapCandyLocation(candyLocation);
  }


  async getCandyLocationById(id: number) {

    const candyLocation = await this.candyLocationRepository.findOne({ where: { id } })

    if (!candyLocation) throw new BadRequestException(`Store with id ${id} not found`);

    return mapCandyLocation(candyLocation);

  }

  async getCandyLocationByUser(user: User) {
    return await this.candyLocationRepository.find({
      where: { user: { id: user.id } },
    });
  }

  // async getAllActiveStores(storeArea: StoreAreaDto) {
  //   return await this.getAllCandyLocation(storeArea);
  // }


  private async getNearbyEntities<T>(
    alias: string,
    storeArea: StoreAreaDto,
    options: {
      select: string[];
      joins?: { property: string; alias: string }[];
    }
  ) {
    const { lat, lng, distance = 2000 } = storeArea;

    const query = this.candyLocationRepository.createQueryBuilder(alias);

    // Aplicar joins opcionales
    options.joins?.forEach(({ property, alias: joinAlias }) => {
      query.leftJoinAndSelect(`${alias}.${property}`, joinAlias);
    });

    query
      .select(options.select)
      .where(`
      ${alias}.isActive = true
      AND ST_DWithin(
        ${alias}.coordinates::geography,
        ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
        :distance
      )
    `)
      .orderBy(`
      ST_Distance(
        ${alias}.coordinates::geography,
        ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography
      )
    `)
      .setParameters({ lat, lng, distance });

    const locations = await query.getMany();

    return locations.map(mapCandyLocation);
  }



  async getAllActiveStores(storeArea: StoreAreaDto) {
    return this.getNearbyEntities(
      'cl',
      storeArea,
      {
        select: [
          'cl.id',
          'cl.title',
          'cl.description',
          'cl.quantity',
          'cl.coordinates',
          'storeImages.url',
        ],
        joins: [
          { property: 'storeImages', alias: 'storeImages' },
        ],
      },
    );
  }


  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

}
