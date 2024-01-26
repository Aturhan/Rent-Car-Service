import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

//import * as dateFns from 'date-fns';

@Injectable()
export class CarsService {
  
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly entityManager: EntityManager) {}



  async create(createCarDto: CreateCarDto) {
      const car = new Car(createCarDto)

      return await this.entityManager.save(car)
      
  }



 async findAll() {
    return this.carRepository.find();
  }

 async findOne(id: number) {
    const car = await this.carRepository.findOne( {
      where: {id}
    })

    if(car){
      return car
    }
    throw new EntityNotFoundError("Car not found with id: " , id)
  }

   async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carRepository.findOne( {
      where: {id}
    })

    car.price = updateCarDto.price
    return car

  }

  async updateAvailability(car:Car,newAvailability:Date) {
    car.availableDate = newAvailability
    await this.entityManager.save(car);
  }


  async remove(id: number) {
    return await this.carRepository.delete(id)
  }



  async initializeCar(createCarDto: CreateCarDto): Promise<void> {
    await this.initialSaveCar(createCarDto);
  }




  private async initialSaveCar(createCarDto:CreateCarDto) {
    const cars = await this.findAll()
  
    if(cars.length !== 0){
      throw new ConflictException("Cars are already registered in the DB! use create method")
    }
    
    for(let i = 0; i <= 15; i++) {

      if(i <=  5){

        const car = new Car(createCarDto);
        car.brand = "Renault";
        car.model = "Clio";
        car.price = 200.0;
        car.availableDate = new Date(Date.now())
        await this.entityManager.save(car);

      } else if(i <= 10){

        const car = new Car(createCarDto);
        car.brand = "Volkswagen ";
        car.model = "Polo";
        car.price = 250.0;
        car.availableDate = new Date(Date.now())
       await this.entityManager.save(car);  

      } 
      else {

        const car = new Car(createCarDto);
        car.brand = "Honda";
        car.model = "Civic";
        car.price = 300.0;
        car.availableDate = new Date(Date.now())
       await this.entityManager.save(car);  
      }
    }

  }
}
