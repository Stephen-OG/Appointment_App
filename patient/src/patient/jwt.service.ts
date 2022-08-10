import { Injectable } from "@nestjs/common";
import { JwtService as Jwt } from '@nestjs/jwt';
import { Patient } from "./entities/patient.entity";
import { PatientRepository } from "./patient.repository";
import * as bcrypt from 'bcrypt';


@Injectable()
export class JwtService {
    private readonly jwt: Jwt;
    constructor(
        private patientRepository : PatientRepository,
        jwt: Jwt
    ){
        this.jwt = jwt;
    }

    // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any) {
    return this.patientRepository.findById(decoded.id);
  }

  // Generate JWT Token
  public async generateToken(patient: Patient) {
    return this.jwt.sign({ id: patient.id, email: patient.email });
  }

  // Validate User's password
  public async isPasswordValid(password: string, patientPassword: string) {
    return await bcrypt.compare(password, patientPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (err) {}
  }
}