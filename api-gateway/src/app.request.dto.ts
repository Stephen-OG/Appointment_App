export class CreateDoctorDto {
    fullnam: string;

    email: string;

    states: string[];
}

export class CreatePatientDto {

    fullname: string;

    email: string;

    password: string;

    state: string;

}

export class PatientLoginDto {

    email: string;

    password: string;


}

export class CreateAppointmentDto {

    duration: string;

    timeOfAppointment: Date;

}

export class ValidateRequestDto{
    token: string;
}

export class CreateOrderRequest{
    patientId: string;
}