import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PatientService } from 'src/patient/patient.service';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports:[PatientModule],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
