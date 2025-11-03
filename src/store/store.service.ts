import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CandyLocation, Store } from './entities';
import { Repository } from 'typeorm';
import { CreateCandyLocationDto, CreateStoreDto, StoreAreaDto, UpdateStoreDto } from './dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class StoreService {
  private readonly logger = new Logger('StoreService');

  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,

    @InjectRepository(CandyLocation)
    private readonly candyLocationRepository: Repository<CandyLocation>,

  ) { }



  async createStore(createStore: CreateStoreDto) {

    try {

      const { latitude, longitude, ...storeDetails } = createStore;

      const store = this.storeRepository.create({
        ...storeDetails,
        coordinates: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      });

      return await this.storeRepository.save(store);

    } catch (error) {
      this.handleExceptions(error);
    }
  }


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

      return await this.candyLocationRepository.save(candyLocation);

    } catch (error) {
      this.handleExceptions(error);

    }
  }

  async updateStore(id: string, updateStoreDto: UpdateStoreDto) {

    const store = this.storeRepository.findOneBy({ id });

    if (!store) throw new BadRequestException(`Store with id ${id} not found`);

    try {
      const storeUpdated = await this.storeRepository.preload({
        id,
        ...updateStoreDto,

      });

      return await this.storeRepository.save(storeUpdated);

    } catch (error) {
      this.handleExceptions(error);

    }
  }

  async getAllActiveStores(storeArea: StoreAreaDto) {

    const stores = await this.getAllStore(storeArea);

    const candyLocations = await this.getAllCandyLocation(storeArea);

    return [
      ...stores,
      ...candyLocations
    ]
  }


  private async getNearbyEntities<T>(
    repository: Repository<T>,
    alias: string,
    storeArea: StoreAreaDto,
    options: {
      select: string[];
      joins?: { property: string; alias: string }[];
    }
  ): Promise<T[]> {
    const { lat, lng, distance = 2000 } = storeArea;

    const query = repository.createQueryBuilder(alias);

    // Aplicar joins opcionales
    if (options.joins) {
      for (const join of options.joins) {
        query.leftJoinAndSelect(`${alias}.${join.property}`, join.alias);
      }
    }

    return query
      .select(options.select)
      .where(`
      ${alias}.isActive = true AND
      ST_DWithin(
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
      .setParameters({ lat, lng, distance })
      .getMany();
  }

  private async getAllStore(storeArea: StoreAreaDto) {

    return this.getNearbyEntities(
      this.storeRepository,
      'store',
      storeArea,
      {
        select: [
          'store.id',
          'store.title',
          'store.coordinates',
          'profileImage.url',
        ],
        joins: [
          { property: 'profileImage', alias: 'profileImage' },
        ],
      }
    );
  }
  private async getAllCandyLocation(storeArea: StoreAreaDto) {

    return this.getNearbyEntities(
      this.candyLocationRepository,
      'cl',
      storeArea,
      {
        select: [
          'cl.id',
          'cl.title',
          'cl.coordinates',
          'profileImage.url',
        ],
        joins: [
          { property: 'profileImage', alias: 'profileImage' },
        ],
      }
    );
  }


  async getStoreById(id: string) {

    const store = await this.storeRepository.findOne({ where: { id } })

    if (!store) throw new BadRequestException(`Store with id ${id} not found`);

    return store;
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs')

  }

}
