import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';
import { RentingModule } from './renting/renting.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrmConfig';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),ConfigModule.forRoot({isGlobal: true}),CarsModule, UsersModule, RentingModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
