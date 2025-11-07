import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandyLocation,  StoreImage } from './entities';
import { AuthModule } from '../auth/auth.module';


@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [TypeOrmModule.forFeature([ StoreImage, CandyLocation]), AuthModule]
})
export class StoreModule { }
