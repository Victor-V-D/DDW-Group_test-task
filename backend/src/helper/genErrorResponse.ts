import IError from "../interfaces/IError.interface";

const genErrorResponse = (type: string, messages: string[]): IError => {
  return { type, messages };
};

export default genErrorResponse;