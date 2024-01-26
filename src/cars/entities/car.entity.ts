import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Car extends AbstractEntity<Car> {
    @Column()
    brand: string;
    @Column()
    model: string;
    @Column()
    price: number;
    @Column({type: 'date'})
    availableDate: Date
}
