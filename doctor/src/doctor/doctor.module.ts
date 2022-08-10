import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './doctor.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Doctor])
  ],
  controllers: [DoctorController],
  providers: [DoctorService,DoctorRepository]
})
export class DoctorModule {}
