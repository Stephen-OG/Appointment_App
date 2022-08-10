import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateDoctorDto } from 'src/app.request.dto';

@Injectable()
export class DoctorService {

  @Client({
    options:{port: 5000},
    transport: Transport.TCP
  })

  private doctorClient: ClientProxy

  public async createDoctor(dto: CreateDoctorDto){
    return this.doctorClient.send('createDoctor', dto);
   }
 
   public async getDoctors() {
     return this.doctorClient.send({cmd: 'findAllDoctors'}, {});
   }

   public async getDoctorsByState() {
    return this.doctorClient.send({cmd: 'findAllDoctorsByState'},{});
  }

}
