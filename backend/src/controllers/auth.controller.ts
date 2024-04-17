import { plainToInstance } from "class-transformer";
import { RequestHandler } from "express";
import { AuthService } from "../services/auth.service";
import { IUserToken } from "../interfaces/IUser.interface";
import genErrorResponse from "../helper/genErrorResponse";
import { UserDto } from "../dto/user.dto";
import IError from "../interfaces/IError.interface";

export class AuthController {
  private service: AuthService = new AuthService();

  public registerHandler: RequestHandler = async (req, res): Promise<void> => {
    const userDto: UserDto = plainToInstance(UserDto, req.body, { excludeExtraneousValues: true });

    try {
      const userToken: IUserToken = await this.service.register(userDto);

      res.send(userToken);
    } catch (e) {
      const customError = e as IError;
      if (Array.isArray(e) || customError.type) res.status(400).send(e);
      else res.status(500).send(genErrorResponse("INTERNAL_ERROR", ["Internal server error"]));
    }
  };

  public signInHandler: RequestHandler = async (req, res): Promise<void> => {
    const userDto: UserDto = plainToInstance(UserDto, req.body, { excludeExtraneousValues: true });

    try {
      const user = await this.service.signIn(userDto);

      res.send(user);
    } catch (e) {
      const error = e as IError;

      if (error.type === "AUTHENTICATION_ERROR") res.status(401).send(e);
      else if (Array.isArray(e)) res.status(400).send(e);
      else res.status(500).send(genErrorResponse("INTERNAL_ERROR", ["Internal server error"]));
    }
  };
};