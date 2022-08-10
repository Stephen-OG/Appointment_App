import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreatePatientDto, PatientLoginDto, PatientUpdateDto, ValidateRequestDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { JwtService } from './jwt.service';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor(
      private patientRepository : PatientRepository,
      
  ){}


  async register(dto: CreatePatientDto) {
    try {
      const existingFullname = await this.patientRepository.find(dto.fullname);

      if (existingFullname)
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'patient already exists',
        data: {},
      };

      const existingEmail = await this.patientRepository.findByEmail(dto.email);
      if (existingEmail)
      return {
        code: HttpStatus.NOT_FOUND,
        message: 'email already exists',
        data: {},
      };
  
      const patient = await this.patientRepository.create(dto);
      return { code: HttpStatus.OK, message: 'succesful', data: patient };

    } catch (error) {
      console.log(error);
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  public async login({ email, password }: PatientLoginDto) {
    try{
      const patient = await this.patientRepository.findByEmail(email);

      if (!patient) {
        return {
          code: HttpStatus.NOT_FOUND,
          message: 'email does not exist',
          data: {},
        };    
      }

      const isPasswordValid = await this.jwtService.isPasswordValid(password, patient.password);

      if (!isPasswordValid) {
        return {
          code: HttpStatus.NOT_FOUND,
          message: 'wrong password',
          data: {},
        }; 
      }
    
      const token = await this.jwtService.generateToken(patient);
      await this.patientRepository.update(patient.id,{accessToken: token})

      return { token, code: HttpStatus.OK, message: 'succesful', data: patient };
    } 
    catch (error) {
      console.log(error)
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  public async validate({ token }: ValidateRequestDto) {
    const decoded: Patient = await this.jwtService.verify(token);

    if (!decoded) {
      return { code: HttpStatus.FORBIDDEN, message: 'Token is invalid', data: {} };
    }

    const auth: Patient = await this.jwtService.validateUser(decoded);

    if (!auth) {
      return { code: HttpStatus.CONFLICT, message: 'Patient not found', data: {} };
    }

    return { code: HttpStatus.OK, message: 'successful', data: decoded.id };
  }

  async getAll() {
    try {
      const patients = await this.patientRepository.findAll();
      return { code: HttpStatus.OK, message: 'succesful', data: patients };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  async getById(id: string) {
    try {
      const patient = await this.patientRepository.findById(id);
      return { code: HttpStatus.OK, message: 'succesful', data: patient };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  async getByEmail(id: string) {
    try {
      const patient = await this.patientRepository.findByEmail(id);
      return { code: HttpStatus.OK, message: 'succesful', data: patient };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  async update(id: string, dto: PatientUpdateDto) {
    try {
      const patient = await this.patientRepository.update(id,dto);
      return { code: HttpStatus.OK, message: 'succesful', data: patient };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }

  async remove(id: string) {
    try {
      const patient = await this.patientRepository.remove(id);
      return { code: HttpStatus.OK, message: 'succesful', data: patient };

    } catch (error) {
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'there was a problem on the server',
        data: {},
      };
    }
  }
}
