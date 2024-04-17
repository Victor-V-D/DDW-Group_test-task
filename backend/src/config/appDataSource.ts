import { DataSource } from "typeorm";
import { Book } from "../entities/book.entity";
import { User } from "../entities/user.entity";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: "Enter_name_database",
  username: "Enter_username",
  password: "Enter_password",
  synchronize: true,
  logging: true,
  entities: [Book, User]
});