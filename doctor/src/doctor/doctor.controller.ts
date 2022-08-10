import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @EventPattern('createDoctor')
  create(@Payload() createDoctorDto: CreateDoctorDto) {

    return this.doctorService.create(createDoctorDto);
  }

  @MessagePattern({ cmd: 'findAllDoctors' })
  getAll() {
    return this.doctorService.getAll();
  }

  @MessagePattern({cmd:'findAllDoctorsByState'})
  getDoctorsByState() {
    return this.doctorService.getDoctorsByState();
  }

  // @MessagePattern('findOneDoctor')
  // findOne(@Payload() id: number) {
  //   return this.doctorService.findOne(id);
  // }

  // @MessagePattern('updateDoctor')
  // update(@Payload() updateDoctorDto: UpdateDoctorDto) {
  //   return this.doctorService.update(updateDoctorDto.id, updateDoctorDto);
  // }

  // @MessagePattern('removeDoctor')
  // remove(@Payload() id: number) {
  //   return this.doctorService.remove(id);
  // }
}
