/* eslint-disable prettier/prettier */
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @CreateDateColumn({type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    createdat: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP '})
    updatedat: Date;

}