import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointments')
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({type: 'timestamptz'})
    timeOfAppointment: Date;

    @Column({type: 'varchar',nullable:false})
    duration: string;

    @Column({type: 'varchar',nullable:true})
    patientId: string;

    @Column({type: 'varchar',nullable:true})
    doctorId: string;
}
