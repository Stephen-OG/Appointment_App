import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { PatientService } from 'src/patient/patient.service';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports:[PatientModule],
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule {}
