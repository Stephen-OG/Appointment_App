import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CreateAppointmentDto, CreateOrderRequest } from 'src/app.request.dto';
import { AuthGuard } from 'src/patient/auth.guard';
import { AppointmentService } from './appointment.service';
import { Request } from 'express';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  createAppointment(@Body() dto: CreateAppointmentDto, @Req() req: Request) {
    const body: CreateOrderRequest = req.body;
    body.patientId = req.body.id
    return this.appointmentService.createAppointment(dto);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getAppointment() {
    return this.appointmentService.getAppointments();
  }
}
