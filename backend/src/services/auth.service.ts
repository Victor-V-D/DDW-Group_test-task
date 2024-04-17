import { validate } from "class-validator";
import { IUser, IUserToken } from "../interfaces/IUser.interface";
import { UserRepository } from "../repositories/user.repository";
import { formatErrors } from "../helper/formatError";
import { UserDto } from "../dto/user.dto";

export class AuthService {
  private repository: UserRepository = new UserRepository();

  public register = async (userDto: UserDto): Promise<IUserToken> => {
    const errors = await validate(userDto, { whitelist: true, validationError: { target: false, value: false } });
    if (errors.length) throw formatErrors(errors);

    const newUser = await this.repository.register(userDto);
    const userToken: IUserToken = { token: newUser.token };

    return userToken;
  };

  public signIn = async (userDto: UserDto): Promise<IUserToken> => {
    const errors = await validate(userDto, { whitelist: true, validationError: { target: false, value: false } });
    if (errors.length) throw formatErrors(errors);

    const user = await this.repository.signIn(userDto);
    const userToken: IUserToken = { token: user.token };

    return userToken;
  };

  public getUserByToken = async (token: string): Promise<IUser> => {
    return await this.repository.getUserByToken(token);
  };
};