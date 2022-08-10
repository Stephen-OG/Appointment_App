import { IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsNotEmpty()
    @IsString()
    duration: string;

    @IsNotEmpty()
    timeOfAppointment: Date;

}

export class AppointmentUpdateDto {
    @IsString()
    duration?: string;

    timeOfAppointment?: Date;

    @IsString()
    patientId?: string;

    @IsString()
    doctorId?: string;

}
