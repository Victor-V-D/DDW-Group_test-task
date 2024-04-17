import { compare, genSalt, hash } from "bcrypt";
import { randomUUID } from "crypto";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../interfaces/IUser.interface";

@Entity("users")
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  token!: string;

  @BeforeInsert()
  async hashPassword() {
    const SALT_WORK_FACTOR = 10;
    if (this.password) {
      const salt = await genSalt(SALT_WORK_FACTOR);
      const hashedPassword = await hash(this.password, salt);
      this.password = hashedPassword;
    }
  };

  @BeforeInsert()
  genToken() {
    this.token = randomUUID();
  };

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  };
};