import { IUserName } from "./IUser";

export interface IBook {
    id: number;
    user: IUserName;
    title: string;
    author: string;
    description: string;
    date: string;
}