import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { IUser } from "../interfaces/IUser.interface";

export class UserDto implements IUser {
  @Expose()
  @IsString()
  @IsNotEmpty()
  username!:string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password!:string;

  @Exclude()
  id!: number;

  @Exclude()
  token!: string;
};