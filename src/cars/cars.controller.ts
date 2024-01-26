import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/auth/authentication.guard';

@UseGuards(JwtAuthGuard)
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
  
  
  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }


  @Post('init')
  async init(@Body() createCarDto: CreateCarDto){
    return this.carsService.initializeCar(createCarDto);
  }


  @Get()
  async findAll() {
    return this.carsService.findAll();
  }


  @Get(':id')
 async findOne(@Param('id',ParseIntPipe) id: number) {
    return this.carsService.findOne(+id);
  }


  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }


  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    return this.carsService.remove(id);
  }
}
