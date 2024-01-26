import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository, EntityNotFoundError } from 'typeorm';
import * as jwt from 'jsonwebtoken'


//import * as dateFns from 'date-fns';


@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ){}


  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email: email}})
    if(user){
      return user;
    }
    throw new EntityNotFoundError("User not found with email: ",email)

  }

 

  async findAll() {
    return this.userRepository.find();
  }

 async findOne(id: number, req) {
  const token = await req.headers.authorization.split(' ')[1]
  this.logger.log('token from request header: ',token)
  const decodedToken = await this.validateToken(token)
  this.logger.log('decoded token: ',decodedToken)

    const user =  await this.userRepository.findOne({
      where: {id},
      relations: {rentings: true}
    })

    if(user){
      return user;
    }
    throw new EntityNotFoundError("User not found with id: " ,id)
  }


  

  async update(id: number, updateUserDto: UpdateUserDto) {
      await this.entityManager.transaction(async (entityManager) =>{
        const user = await this.userRepository.findOne({where: {id}})
        user.fullName = updateUserDto.fullName
        user.email = updateUserDto.email
        await entityManager.save(user);
        return user;
      })
  }

 async remove(id: number) {
    return await this.userRepository.delete({id})
  }

  private  validateToken(token: string):any {
    try {
      return  jwt.verify(token, process.env.JWT_SECRET); 
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
  }

