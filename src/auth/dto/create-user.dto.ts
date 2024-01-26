import { IsEmail, IsNotEmpty, IsString } from "class-validator"



export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName:string
    @IsEmail()
    email:string

    @IsNotEmpty()
    password:string
}
