import { HttpStatus, Injectable } from '@nestjs/common';
import { DoctorRepository } from './doctor.repository';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    private doctorRepository : DoctorRepository

  ){}

  async create(dto: CreateDoctorDto) {
    try {
      const doctor = await this.doctorRepository.create(dto);
      return { code: HttpStatus.OK, message: 'succesful', data: doctor };

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
      const doctors = await this.doctorRepository.findAll();
      console.log(doctors)
      return { code: HttpStatus.OK, message: 'succesful', data: doctors };

    } catch (error) {
      console.log(error)
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  async getDoctorsByState() {
    try {
      var states = 'moods';
      const doctors = await this.doctorRepository.findByState(states);
      console.log(doctors);
        if (!doctors) {
          return {
            code: HttpStatus.NOT_FOUND,
            message: 'record not found',
            data: {},
          };
        }
      
      return { code: HttpStatus.OK, message: 'succesful', data: doctors };

    } catch (error) {
      console.log(error)
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }
}
