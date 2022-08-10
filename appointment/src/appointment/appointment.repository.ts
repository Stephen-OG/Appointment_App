/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentUpdateDto, CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { validateDuration } from './utils/validation';



@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository : Repository<Appointment>,
    
  ){}

  async create({duration,timeOfAppointment}: CreateAppointmentDto) {
    try{
      const invalidDuration = await validateDuration(duration);
      if(invalidDuration){
        return { code: HttpStatus.BAD_REQUEST, message: invalidDuration.message, data: {} };
      }
      timeOfAppointment = new Date();

        const createAppointmentDto = {
          duration :duration,
          timeOfAppointment : timeOfAppointment
        }

      const entity = this.appointmentRepository.create(createAppointmentDto);
       await this.appointmentRepository.save(entity);

       return entity;
    }
    catch (error) {
        console.log(error);
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findAll() {
    try{
        const appointments = await this.appointmentRepository.find({});
        if (!appointments) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND)
      }
      return await this.appointmentRepository.find({});
    }
    catch (error) {
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }

  async findById(id_: string) {
      const appointment = await this.appointmentRepository.findOne({where:{id:id_}});
      if (appointment) {
        return appointment;
      }
      throw new HttpException('Patient with this email does not exist', HttpStatus.NOT_FOUND);  
  }

  async update(id: string, dto: AppointmentUpdateDto) {
    try {
      const patient = await this.appointmentRepository.update(id,dto);
      return { code: HttpStatus.OK, message: 'succesful', data: patient };

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
      const result = await this.appointmentRepository.delete({ id });

      if (result.affected == 0) {
        throw new HttpException('id not found', HttpStatus.NOT_FOUND)
      }

      return result;
    } catch (error) {
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }
}