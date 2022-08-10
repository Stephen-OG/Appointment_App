// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { AppService } from './app.service';
// import { CreateAppointmentDto, CreateDoctorDto, CreatePatientDto } from './app.request.dto';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }

//   @Post('/doctor')
//   createDoctor(@Body() dto: CreateDoctorDto) {
//     return this.appService.createDoctor(dto);
//   }

//   @Get('/doctor')
//   getDoctors() {
//     return this.appService.getDoctors();
//   }

//   @Post('/patient')
//   createPatient(@Body() dto: CreatePatientDto) {
//     return this.appService.createPatient(dto);
//   }

//   @Get('/patient')
//   getPatients() {
//     return this.appService.getPatients();
//   }

//   @Post('/appointment')
//   createAppointment(@Body() dto: CreateAppointmentDto) {
//     return this.appService.createAppointment(dto);
//   }

//   @Get('/appointment')
//   getAppointment() {
//     return this.appService.getAppointments();
//   }
// }
