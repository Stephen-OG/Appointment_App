import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { response } from 'src/utils/response';
import { CreatePatientDto, PatientLoginDto, PatientUpdateDto, ValidateRequestDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';

@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @EventPattern('register')
  register(@Payload() createPatientDto: CreatePatientDto) {
    return this.patientService.register(createPatientDto);
  }

  @EventPattern('login')
  login(@Payload() loginDto: PatientLoginDto) {
    return this.patientService.login(loginDto);
  }

  @EventPattern('validate')
  validate(@Payload() validatePatientDto: ValidateRequestDto) {
    return this.patientService.validate(validatePatientDto);
  }
  
  @MessagePattern({cmd:'findAllPatient'})
  getAll() {
    return this.patientService.getAll();
  }

  @EventPattern('findPatient')
  getPatient(@Payload() id: string) {
    return this.patientService.getById(id);
  }
  
  @Post('/')
  async createPatient(@Body() dto: CreatePatientDto, @Res() res) {

    const result = await this.patientService.register(dto);
    console.log(result);
    return response(res, result);
  }

  @Get('/')
  async getAllPatients(@Res() res) {
    const result = await this.patientService.getAll();
    return response(res, result);

  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.patientService.getById(id);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() body: PatientUpdateDto, @Res() res) {
    const result = await this.patientService.update(id, body);
    return response(res, result);
    }
  
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
