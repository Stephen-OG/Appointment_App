import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateDoctorDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsArray()
    states: string[];
}

export class UpdateDoctorDto {

    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsArray()
    states: string[];
}

