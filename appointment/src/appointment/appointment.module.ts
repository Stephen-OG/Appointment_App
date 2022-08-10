import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentRepository } from './appointment.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment])
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService,AppointmentRepository]
})
export class AppointmentModule {}
