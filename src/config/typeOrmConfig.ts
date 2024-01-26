import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Car } from "src/cars/entities/car.entity";
import { Renting } from "src/renting/entities/renting.entity";
import { User } from "src/users/entities/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5440,
    username: 'root',
    password: 'root',
    database: 'rent-db',
    entities: [Renting,Car,User],
    synchronize: true,
}