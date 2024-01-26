import { AbstractEntity } from "src/database/abstract.entity"
import { Renting } from "src/renting/entities/renting.entity"
import { Column, CreateDateColumn, Entity, OneToMany } from "typeorm"
import { Role } from "./user.role"
import * as bcrypt from 'bcrypt'

@Entity()
export class User extends AbstractEntity<User> {
    @Column()
    fullName:string
    @Column({unique: true})
    email:string
    @Column()
    password:string
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date
    
    @OneToMany(() => Renting, (renting) => renting.user, {cascade: true} )
    rentings: Renting[]
    @Column({default: Role.USER})
    role:Role

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password,this.password)
    }

}
