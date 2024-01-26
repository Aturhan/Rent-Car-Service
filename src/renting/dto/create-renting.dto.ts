import { IsEmail, IsNotEmpty, Min} from "class-validator";


export class CreateRentingDto {
    @IsNotEmpty()
    @Min(2)
    dayCount: number
    @IsNotEmpty()
    beginDate: Date
    @IsNotEmpty()
    @IsEmail()
    userEmail:string
    @IsNotEmpty()
    carId:number
}
