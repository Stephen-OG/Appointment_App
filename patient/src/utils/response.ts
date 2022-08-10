import { Response } from 'express';

export const response = (res: Response, result: any) => {
  res.status(result.code).json(result);
};
