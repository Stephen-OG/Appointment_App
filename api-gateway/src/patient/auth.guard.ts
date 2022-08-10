import { Injectable, CanActivate, ExecutionContext, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { Request } from 'express';
import { PatientService } from './patient.service';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(PatientService)
  public readonly service: PatientService;

  public async canActivate(ctx: ExecutionContext): Promise<boolean> | never {
    const req: Request = ctx.switchToHttp().getRequest();
    const authorization: string = req.headers['authorization'];


    if (!authorization) {
      throw new UnauthorizedException();
    }

    const bearer: string[] = authorization.split(' ');
    //console.log(bearer);

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException();
    }

    const token: string = bearer[1];
    //console.log(token);

    const { code, message,data } = await this.service.validate(token);

    req.body.id = data;
    console.log(req.body.id);


    if (code !== HttpStatus.OK) {
      throw new UnauthorizedException();
    }

    return true;
  }
}