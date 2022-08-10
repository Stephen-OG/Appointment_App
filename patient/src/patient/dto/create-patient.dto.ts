/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePatientDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(7)
    password: string;

    @IsNotEmpty()
    @IsString()
    state: string;

}


export class PatientLoginDto {

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}

export class ValidateRequestDto  {
    @IsString()
    public token: string;
  }

export class PatientUpdateDto {

    @IsNotEmpty()
    @IsString()
    fullname?: string;

    @IsString()
    email?: string;

    @IsString()
    password?: string;

    @IsString()
    state?: string;

    @IsString()
    accessToken?: string;

    @IsString()
    refreshToken?: string;
}