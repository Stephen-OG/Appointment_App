/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';

export const validateDuration = async (duration: string) => {

    switch (duration) {
        case '30':
          duration;
          break;

        case '60':
          duration;
          break;

          case '90':
          duration;
          break;
      
        default:
          return {code: HttpStatus.CONFLICT,message: 'invalid duration',data: {},
          };
      }
}