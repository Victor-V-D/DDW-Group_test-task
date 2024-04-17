import { IUser } from "./IUser.interface";

export interface IBook {
    id: number;
    title: string;
    description: string;
    author: string;
    date: string;
    user: IUser;
    userId: number
}