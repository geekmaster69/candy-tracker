import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateCandyLocationDto, CreateStoreDto, StoreAreaDto, UpdateStoreDto } from './dto';

@Controller('locations')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post('store')
  createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.createStore(createStoreDto);
  }
  @Post('candy')
  createCandyLocation(@Body() createCandyLocation: CreateCandyLocationDto) {
    return this.storeService.createCandyLocation(createCandyLocation);
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
