import { HttpStatus, Injectable } from '@nestjs/common';
import { AppointmentUpdateDto, CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentRepository } from './appointment.repository';
import { firstValueFrom } from 'rxjs';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import env from 'src/config/env';

@Injectable()
export class AppointmentService {
  @Client({
    options:{port: env.doctor_port},
    transport: Transport.TCP
  })

  private doctorClient: ClientProxy

  constructor(
    private appointmentRepository : AppointmentRepository
){}

  async create(dto: CreateAppointmentDto) {
    try {
      var state = 'NY City';
      const doctors = await firstValueFrom(this.doctorClient.send('findAllDoctorsByState',state));

      const appointment = await this.appointmentRepository.create(dto);
      return { code: HttpStatus.OK, message: 'succesful', data: appointment };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  async getAll() {
    try {
      const appointments = await this.appointmentRepository.findAll();
      return { code: HttpStatus.OK, message: 'succesful', data: appointments };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }


  async getById(id: string) {
    try {
      const appointment = await this.appointmentRepository.findById(id);
      return { code: HttpStatus.OK, message: 'succesful', data: appointment };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  async update(id: string, dto: AppointmentUpdateDto) {
    try {
      const appointment = await this.appointmentRepository.update(id,dto);
      return { code: HttpStatus.OK, message: 'succesful', data: appointment };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  async remove(id: string) {
    try {
      const patient = await this.appointmentRepository.remove(id);
      return { code: HttpStatus.OK, message: 'succesful', data: patient };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }
}
