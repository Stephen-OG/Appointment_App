/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/domain/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('patients')
export class Patient extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false})
    fullname: string;

    @Column({type: 'varchar',nullable:false})
    email: string;

    @Column({type: 'varchar',nullable:false})
    state: string;

    @Column({type: 'varchar',nullable:false})
    password: string;

    @Column({type: 'varchar',nullable:true})
    accessToken: string;

    @Column({type: 'varchar',nullable:true})
    refreshToken: string;
}
