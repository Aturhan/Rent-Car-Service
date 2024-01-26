import { Module } from '@nestjs/common';
import { RentingService } from './renting.service';
import { RentingController } from './renting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Renting } from './entities/renting.entity';
import { UsersModule } from 'src/users/users.module';
import { CarsModule } from 'src/cars/cars.module';




@Module({
  imports: [TypeOrmModule.forFeature([Renting]),UsersModule,CarsModule],
  controllers: [RentingController],
  providers: [RentingService],
})
export class RentingModule {}
