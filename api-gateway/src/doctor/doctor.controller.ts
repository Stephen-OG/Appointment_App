import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateDoctorDto } from 'src/app.request.dto';
import { AuthGuard } from 'src/patient/auth.guard';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/')
  createDoctor(@Body() dto: CreateDoctorDto) {
    return this.doctorService.createDoctor(dto);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getDoctors() {
    return this.doctorService.getDoctors();
  }

}
