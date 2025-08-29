import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandyLocation, Promotion, Store, StoreImage } from './entities';


@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [TypeOrmModule.forFeature([Store, Promotion, StoreImage, CandyLocation])]
})
export class StoreModule {}
