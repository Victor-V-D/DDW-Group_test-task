import { ValidationError } from 'class-validator';
import IError from '../interfaces/IError.interface';

export const formatErrors = (errors: ValidationError[]): IError[] => {
  const updatedErrors: IError[] = errors.map((e) => {
    return {
      type: e.property,
      messages: e.constraints ? Object.values(e.constraints) : ['unknown error']
    };
  });

  return updatedErrors;
};