import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';

export class CreateDoctorEvent {
  constructor(
    public readonly fullname: string,
    public readonly email: string,
    public readonly states: string[]
  ){}
}
