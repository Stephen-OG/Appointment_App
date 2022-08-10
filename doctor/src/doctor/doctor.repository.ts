/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/create-doctor.dto';
import { Doctor } from './entities/doctor.entity';


@Injectable()
export class DoctorRepository {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository : Repository<Doctor>,
    
  ){}

  async create({fullname,email,states}: CreateDoctorDto) {
    try{
    const existingRecord = await this.doctorRepository.find({
        where: { fullname: fullname },
        });

        if (existingRecord.length > 0)
        {
            throw new HttpException('doctor already exists', HttpStatus.CONFLICT)
        };

        const existingEmail = await this.doctorRepository.find({
          where: { email: email },
          });
  
          if (existingEmail.length > 0)
          {
              throw new HttpException('email already exists', HttpStatus.CONFLICT)
          };
        
        const createDoctordto = {
          fullname :fullname,
          email: email,
          states: states
        }

      const entity = this.doctorRepository.create(createDoctordto);
      return await this.doctorRepository.save(entity);
    }
    catch (error) {
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findAll() {
    try{
        const doctors = await this.doctorRepository.find({});
        if (!doctors) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND)
      }
      return await this.doctorRepository.find({});
    }
    catch (error) {
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async find(fullname: string) {
    return await this.doctorRepository.find({where:{fullname}});
  }

  async findByState(states: string) {

    return await this.doctorRepository.find({where:{states}});
  }

  async findById(id_: string) {
      return await this.doctorRepository.findOne({where:{id:id_}});  
  }

  async update (id: string, updateDto: UpdateDoctorDto) {
    try{
      const doctor = await this.findById(id);

      if (!doctor) {
        throw new HttpException('doctor not found', HttpStatus.NOT_FOUND)
      }

      const updatedDocotor = await this.doctorRepository.update(id, {
        fullname: updateDto.fullname,
        states: updateDto.states,
       
      });

      if (updatedDocotor.affected < 1) {
        throw new HttpException('unable to update record', HttpStatus.INTERNAL_SERVER_ERROR)
      }

      return await this.findById(id);
    }
    catch(error){
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)

    }

    
  }

  async remove(id: string) {
    try {
      const result = await this.doctorRepository.delete({ id });

      if (result.affected == 0) {
        throw new HttpException('id not found', HttpStatus.NOT_FOUND)
      }

      return result;
    } catch (error) {
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }
}