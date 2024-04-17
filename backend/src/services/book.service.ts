import { validate } from 'class-validator';
import { BookRepository } from '../repositories/book.repository';
import { BookDto } from '../dto/book.dto';
import { IBook } from '../interfaces/IBook.interfaces';

export class BookService {
    private repository: BookRepository;

    constructor() {
        this.repository = new BookRepository();
    }

    async getBook(): Promise<IBook[]> {
        return await this.repository.getBook();
    }

    async createBook(bookDto: BookDto): Promise<IBook> {
        const errors = await validate(bookDto, {
            whitelist: true,
            validationError: { target: false, value: false }
        });
        if (errors.length) throw errors;
        return await this.repository.createBook(bookDto);
    };

    async deleteBook(id: number, userId: number) {
        return await this.repository.deleteBook(id, userId);
    }
}