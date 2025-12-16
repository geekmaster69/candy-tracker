import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateCandyLocationDto, StoreAreaDto, UpdateCandyLocationDto, } from './dto';

import { User } from '../auth/entities/user.entity';
import { Auth, GetUser } from '../auth/decorator';

@Controller('locations')
export class StoreController {
  constructor(private readonly storeService: StoreService) { }

  @Post()
  @Auth()
  createCandyLocation(
    @Body() createCandyLocation: CreateCandyLocationDto,
    @GetUser() user: User
  ) {
    return this.storeService.createCandyLocation(createCandyLocation, user);
  }


  @Patch(':id')
  @Auth()
  updateCandyLocation(
    @Body() updateCandyLocationDto: UpdateCandyLocationDto,

    @Param('id', ParseIntPipe) id: number
  ) {
    return this.storeService.updateCandyLocation(id, updateCandyLocationDto);
  }

  @Get()
  getAllActiveStores(@Query() storeArea: StoreAreaDto) {
    return this.storeService.getAllActiveStores(storeArea)
  }

  @Get('user')
  @Auth()
  getCandyLocationsByUser(@GetUser() user: User) {
    return this.storeService.getCandyLocationByUser(user)
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.getCandyLocationById(id)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.storeService.deleteCandyLocationById(id);

  }
}
