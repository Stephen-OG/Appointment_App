/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto, PatientUpdateDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import * as bcrypt from 'bcrypt';



@Injectable()
export class PatientRepository {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository : Repository<Patient>,
    
  ){}

  async create({fullname,email,password,state}: CreatePatientDto) {
    try{
    

        const hashedPassword = await bcrypt.hash(password, 10);
        const createPatientdto = {
          fullname :fullname,
          email : email,
          password: hashedPassword,
          state: state
        }

      const entity = this.patientRepository.create(createPatientdto);
       await this.patientRepository.save(entity);

       delete entity.password;

       return entity;
    }
    catch (error) {
        console.log(error);
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findAll() {
    try{
        const patients = await this.patientRepository.find({});
        if (!patients) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND)
      }
      return await this.patientRepository.find({});
    }
    catch (error) {
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }


  async find(fullname: string) {
    return await this.patientRepository.findOne({where:{fullname}});
  }

  async findByEmail(email: string) {
     return await this.patientRepository.findOne({ where:{email }});
    
  }

  async findById(id_: string) {
      const patient = await this.patientRepository.findOne({where:{id:id_}});
      if (patient) {
        return patient;
      }
      throw new HttpException('Patient with this email does not exist', HttpStatus.NOT_FOUND);  
  }

   async update(id: string, dto: PatientUpdateDto) {
    try {
      const patient = await this.patientRepository.update(id,dto);
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
      const result = await this.patientRepository.delete({ id });

      if (result.affected == 0) {
        throw new HttpException('id not found', HttpStatus.NOT_FOUND)
      }

      return result;
    } catch (error) {
        throw new HttpException('there was a problem on the server', HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

}