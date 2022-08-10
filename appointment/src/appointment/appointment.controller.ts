import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppointmentService } from './appointment.service';
import { AppointmentUpdateDto, CreateAppointmentDto } from './dto/create-appointment.dto';
import { response } from './utils/response';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @EventPattern('createAppointment')
  create(@Payload() createPatientDto: CreateAppointmentDto) {
    return this.appointmentService.create(createPatientDto);
  }

  @MessagePattern({cmd:'findAllAppointment'})
  getAll() {
    return this.appointmentService.getAll();
  }

  @Post('/')
  async createAppointment(@Body() dto: CreateAppointmentDto, @Res() res) {
    const result = await this.appointmentService.create(dto);
    console.log(result);
    return response(res, result);
  }

  @Get('/')
  async getAllAppointments(@Res() res) {
    const result = await this.appointmentService.getAll();
    return response(res, result);

  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.appointmentService.getById(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: AppointmentUpdateDto, @Res() res) {
    const result = await this.appointmentService.update(id, body);
    return response(res, result);
    }
  
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
