import { BaseEntity } from "src/domain/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('doctors')
export class Doctor extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false})
    fullname: string;

    @Column({type: 'varchar',nullable:false})
    email: string;

    @Column({type: 'varchar',nullable:false})
    states: string[];
}
