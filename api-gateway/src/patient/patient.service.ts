import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreatePatientDto, PatientLoginDto, ValidateRequestDto } from 'src/app.request.dto';

@Injectable()
export class PatientService {
  @Client({
    options:{port: 8000},
    transport: Transport.TCP
  })

  private patientClient: ClientProxy

   async register(dto: CreatePatientDto){
    return this.patientClient.send('register', dto);
   }

   async login(dto: PatientLoginDto){
    return this.patientClient.send('login', dto);
   }

   async validate(token: string){
    return firstValueFrom(this.patientClient.send('validate', {token}));
   }
 
   async getPatients() {
     return this.patientClient.send({cmd: 'findAllPatient'}, {});
   }

   async getPatient() {
    return this.patientClient.send({cmd: 'findPatient'}, {});
  }
}
