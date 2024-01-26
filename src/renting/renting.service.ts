import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateRentingDto } from './dto/create-renting.dto';
import { UpdateRentingDto } from './dto/update-renting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Renting } from './entities/renting.entity';
import { EntityManager, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CarsService } from 'src/cars/cars.service';
import * as datefns from 'date-fns';
import { RentingResponse } from './dto/renting-response.dto';


@Injectable()
export class RentingService {
  constructor(
    @InjectRepository(Renting)
    private readonly rentReposiotory: Repository<Renting>,
    private readonly entityManager: EntityManager,
    @Inject(UsersService)
    private readonly userService: UsersService,
    @Inject(CarsService)
    private readonly carService: CarsService
  ) {}


 async create(createRentingDto: CreateRentingDto) {
    const car = await this.carService.findOne(createRentingDto.carId)
    const user = await this.userService.findByEmail(createRentingDto.userEmail)

   const result =  await this.entityManager.transaction(async (entityManager) => {
      if(!datefns.isBefore(car.availableDate, createRentingDto.beginDate)){  //çalıştı dokunma 
        throw new ConflictException("Car is not available please select next date")
    }

      const rent = new Renting({
      price: car.price * createRentingDto.dayCount,
      daycount: createRentingDto.dayCount,  
      beginDate: createRentingDto.beginDate,
      finishDate: datefns.addDays(createRentingDto.beginDate, createRentingDto.dayCount),
      user: user,
      carId: car.id
    });

    const saved =  await entityManager.save(rent);

    // Update car availability date
    await this.carService.updateAvailability(car,rent.finishDate)
  
      return {saved,car};

    })

    const res = new RentingResponse()
    res.success = true;
    res.message ='Renting successfully'
    res.userFullName = result.saved.user.fullName
    res.userEmail= result.saved.user.email
    res.rentBeginDate = result.saved.beginDate
    res.rentFinishDate = result.saved.finishDate
    res.price = result.saved.price
    res.carId = result.car.id
    res.carBrand = result.car.brand
    res.carModel = result.car.model
    return {
      res
    }
    
    
  }


 async findAll() {
    return await this.rentReposiotory.find();
  }

 async findOne(id: number) {
    return await this.rentReposiotory.findOne({where: {id: id}});
  }

 async update(id: number, updateRentingDto: UpdateRentingDto) {
    const rent = await this.rentReposiotory.findOne({where: { id: id }})
    const car = await this.carService.findOne(rent.carId)
    
   const result = await this.entityManager.transaction(async (entityManager) => {

      if(!datefns.isAfter(updateRentingDto.beginDate, car.availableDate)){
        throw new ConflictException("Car is not available please check date")
      }
  
      rent.beginDate = updateRentingDto.beginDate ?? rent.beginDate
      rent.daycount = updateRentingDto.dayCount ?? rent.daycount
      rent.price = car.price * updateRentingDto.dayCount !== 0 ?  car.price * updateRentingDto.dayCount : rent.price
      rent.carId = updateRentingDto.carId ?? rent.carId
  
      const updated = await entityManager.save(rent)
      return {updated,car}
      
    })

    const res = new RentingResponse()
      res.success = true;
      res.message ='Renting updated successfully'
      res.userFullName = result.updated.user.fullName
      res.userEmail= result.updated.user.email
      res.rentBeginDate = result.updated.beginDate
      res.rentFinishDate = result.updated.finishDate
      res.price = result.updated.price
      res.carId = result.car.id
      res.carBrand = result.car.brand
      res.carModel = result.car.model
      return {
        res
      }


  }

 async remove(id: number) {
    await this.rentReposiotory.delete(id);
  }
}
