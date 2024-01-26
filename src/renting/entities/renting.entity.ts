import { AbstractEntity } from "src/database/abstract.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";

@Entity()
export class Renting extends AbstractEntity<Renting>{
    @Column()
    price: number
    @Column()
    daycount: number
    @Column({type: 'date'})
    beginDate: Date

    @Column({type: 'date'})
    finishDate: Date

    @ManyToOne(() => User, (user) => user.rentings)
    user: User
    @Column()
    carId:number
    @CreateDateColumn({type: 'date'})
    createdAt:Date
    
}
