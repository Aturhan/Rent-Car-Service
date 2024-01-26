import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { EntityManager, EntityNotFoundError, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(JwtService)
        private  jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private entityManager: EntityManager
    
    ){}

    async login(authDto: AuthDto) {
        const user = await this.validateUser(authDto.email,authDto.password);
    
        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }

        const payload = {email: user.email,id: user.id,role: user.role}
        const accessToken = await this.jwtService.signAsync(payload)

        return {
            access_token: accessToken
          };
    }

    async create(createUserDto: CreateUserDto) {
      
        const user = new User(createUserDto);
    
        const hashedPasword = await bcrypt.hash(user.password, 12);
    
        user.password = hashedPasword
        return await this.userRepository.save(user);
        
    }


    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({where: {email}});
       
        if(user && (await user.validatePassword(password))) {

            return user
        }
        
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email: email}})
        if(user){
          return user;
        }
        throw new EntityNotFoundError("User not found with email: ",email)
    
      }
}
