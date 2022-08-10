import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAppointmentDto, CreateDoctorDto, CreatePatientDto } from './app.request.dto';

@Injectable()
export class AppService {
  // constructor(
  //   @Inject('DOCTOR') private readonly doctorClient: ClientProxy,
  //   @Inject('PATIENT') private readonly patientClient: ClientProxy,
  //   @Inject('APPOINTMENT') private readonly appointmentClient: ClientProxy

  // ){}

  // getHello(): string {
  //   return 'Hello World!';
  // }

  // async createDoctor(dto: CreateDoctorDto){
  //  return this.doctorClient.send('createDoctor', dto);
  // }

  // async getDoctors() {
  //   return this.doctorClient.send({cmd: 'findAllDoctor'}, {});
  // }

  // async createPatient(dto: CreatePatientDto){
  //   return this.patientClient.send('createPatient', dto);
  //  }
 
  //  async getPatients() {
  //    return this.patientClient.send({cmd: 'findAllPatient'}, {});
  //  }

  //  async createAppointment(dto: CreateAppointmentDto){
  //   return this.appointmentClient.send('createAppointment', dto);
  //  }
 
  //  async getAppointments() {
  //    return this.appointmentClient.send({cmd: 'findAllAppointment'}, {});
  //  }

  // async registerPatient(dto: CreateDoctorDto){
  //   return this.patientClient.send({cmd: 'findAllDoctor'}, {});
  // }
 
  //  async loginPatient() {
  //    return this.patientClient.send({cmd: 'findAllDoctor'}, {});
  //  }
}
