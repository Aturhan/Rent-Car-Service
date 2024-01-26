import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RentingService } from './renting.service';
import { CreateRentingDto } from './dto/create-renting.dto';
import { UpdateRentingDto } from './dto/update-renting.dto';
import { JwtAuthGuard } from 'src/auth/authentication.guard';

@Controller('renting')
export class RentingController {
  constructor(private readonly rentingService: RentingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createRentingDto: CreateRentingDto) {
    return this.rentingService.create(createRentingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.rentingService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id',ParseIntPipe) id: number) {
    return this.rentingService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() updateRentingDto: UpdateRentingDto) {
    return this.rentingService.update(id, updateRentingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id',ParseIntPipe) id: number) {
    return this.rentingService.remove(id);
  }
}
