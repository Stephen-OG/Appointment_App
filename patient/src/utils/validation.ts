import { HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import env from 'src/config/env';


export const validateStatusJobtypeWorkplace = async (status: string, jobtype: string, workplace: string) => {
      
      status = status.toLowerCase();
      jobtype = jobtype.toLowerCase();
      workplace = workplace.toLowerCase();

    switch (status) {
        case 'open':
          status;
          break;

        case 'closed':
          status;
          break;
      
        default:
          return {code: HttpStatus.CONFLICT,message: 'invalid status',data: {},
          };
      }

      switch (jobtype) {
        case 'full-time':
          jobtype;
          break;

        case 'part-time':
          jobtype;
          break;

        case 'internship':
          jobtype;
          break;

        default:
          return {code: HttpStatus.CONFLICT,message: 'invalid jobtype',data: {},
          };
      }

      switch (workplace) {
        case 'remote':
          workplace;
          break;

        case 'onsite':
          workplace;
          break;

        case 'hybrid':
          workplace;
          break;
      
        default:
          return {code: HttpStatus.CONFLICT,message: 'workplace does not exist',data: {},
          };
      }
}
