import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        
    ) {}
    
    
    @Post('login')
    async login(@Body() authDto:AuthDto) {
        return  this.authService.login(authDto);
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    async register(@Body() creatUserDto: CreateUserDto) {
        return this.authService.create(creatUserDto);

    }

}
