import { Repository } from "typeorm";
import { appDataSource } from "../config/appDataSource";
import { User } from "../entities/user.entity";
import { IUser } from "../interfaces/IUser.interface";
import genErrorResponse from "../helper/genErrorResponse";
import { UserDto } from "../dto/user.dto";

export class UserRepository extends Repository<User>{
  constructor() {
    super(User, appDataSource.createEntityManager());
  };

  public register = async (userDto: UserDto): Promise<IUser> => {
    const newUser: User = this.create(userDto);

    const isExistUser: IUser | null = await this.findOneBy({ username: newUser.username });
    if (isExistUser) throw genErrorResponse("DUPLICATE_USER", ["User already exist"]);

    return await this.save<User>(newUser);
  };

  public signIn = async (userDto: UserDto): Promise<IUser> => {
    const user: User | null = await this.findOneBy({ username: userDto.username });
    if (!user) throw genErrorResponse("AUTHENTICATION_ERROR", ["Login or password is wrong"]);

    const isMatch = await user.comparePassword(userDto.password);
    if (!isMatch) throw genErrorResponse("AUTHENTICATION_ERROR", ["Login or password is wrong"]);

    user.genToken();
    const userWithToken: IUser = await this.save(user);

    return userWithToken;
  };

  public getUserByToken = async (token: string): Promise<IUser> => {
    const user: User | null = await this.findOneBy({ token });
    if (!user) throw genErrorResponse("AUTHENTICATION_ERROR", ["Wrong token"]);

    return user;
  };
};