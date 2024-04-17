import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsNumberString } from "class-validator";

export class BookDto {
    @Expose()
    @IsNotEmpty({ message: 'Поле title обязательное' })
    @IsString()
    title!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле description обязательное' })
    @IsString()
    description!: string;

    @Expose()
    @IsNotEmpty({ message: 'Поле author обязательное' })
    @IsString()
    author!: string;
    
    @Expose()
    @IsNotEmpty({ message: 'Поле date обязательное' })
    @IsString()
    date!: string;

    @Expose()
    @IsNotEmpty()
    @IsNumberString()
    userId!: number;
}