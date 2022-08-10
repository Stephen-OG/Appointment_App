/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import env from 'src/config/env';
import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: env.jwt_secret,
      signOptions: { expiresIn: env.jwt_expiry_date },
    }),
    TypeOrmModule.forFeature([Patient])
  ],
  controllers: [PatientController],
  providers: [PatientService,PatientRepository, JwtService, JwtStrategy]
})
export class PatientModule {}
