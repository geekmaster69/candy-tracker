import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateCandyLocationDto, CreateStoreDto, StoreAreaDto, UpdateStoreDto } from './dto';

import { User } from '../auth/entities/user.entity';
import { Auth, GetUser } from '../auth/decorator';

@Controller('locations')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post('store')
  @Auth()
  createStore(
    @Body() createStoreDto: CreateStoreDto,
  ) {
    return this.storeService.createStore(createStoreDto);
  }

  @Post('candy')
  @Auth()
  createCandyLocation(
    @Body() createCandyLocation: CreateCandyLocationDto,
    @GetUser() user: User
  ) {
    return this.storeService.createCandyLocation(createCandyLocation, user);
  }

  @Get()
  getAllActiveStores(@Query() storeArea: StoreAreaDto) {
    return this.storeService.getAllActiveStores(storeArea)
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.storeService.getStoreById(id)
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.updateStore(id, updateStoreDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {

  }
}
