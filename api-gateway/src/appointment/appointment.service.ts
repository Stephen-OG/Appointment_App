import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { CreateAppointmentDto } from 'src/app.request.dto';

@Injectable()
export class AppointmentService {
  @Client({
    options:{port: 8001},
    transport: Transport.TCP
  })

  private appointmentClient: ClientProxy

  async createAppointment(dto: CreateAppointmentDto){
    return this.appointmentClient.send('createAppointment', dto);
   }
 
   async getAppointments() {
     return this.appointmentClient.send({cmd: 'findAllAppointment'}, {});
   }
  
}
