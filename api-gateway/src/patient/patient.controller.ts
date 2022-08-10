import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePatientDto, PatientLoginDto } from 'src/app.request.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/register')
  createPatient(@Body() dto: CreatePatientDto) {
    return this.patientService.register(dto);
  }

  @Post('/login')
  login(@Body() dto: PatientLoginDto) {
    return this.patientService.login(dto);
  }

  // @Get('/')
  // getPatients() {
  //   return this.patientService.getPatients();
  // }

}
