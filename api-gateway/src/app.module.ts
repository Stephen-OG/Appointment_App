import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PatientService } from './patient/patient.service';

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    AppointmentModule
  ],
  controllers: [],
  providers: [AppService,PatientService],
})
export class AppModule {}
