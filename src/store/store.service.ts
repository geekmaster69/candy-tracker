import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Store, StoreImage } from './entities';
import { Repository } from 'typeorm';
import { CreateStoreDto, UpdateStoreDto } from './dto';

@Injectable()
export class StoreService {
  private readonly logger = new Logger('StoreService');

  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,

    @InjectRepository(StoreImage)
    private readonly storeImageRepository: Repository<StoreImage>
  ) { }



  async createStore(createStore: CreateStoreDto) {

    try {

      const { images = [], ...storeDetails } = createStore;

      const store = this.storeRepository.create(createStore);

      return await this.storeRepository.save(store);

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
        ...updateStoreDto
      });

      return await this.storeRepository.save(storeUpdated);

    } catch (error) {
      this.handleExceptions(error);

    }
  }

  async getAllActiveStores() {
    return this.storeRepository.find({ where: { isActive: true }, relations: { images: true }, select: {latitude: true, longitude: true, images: true, id: true} })
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
