import { Repository } from 'typeorm';
import { appDataSource } from '../config/appDataSource';
import { Book } from '../entities/book.entity';
import { BookDto } from '../dto/book.dto';
import { IBook } from '../interfaces/IBook.interfaces';

export class BookRepository extends Repository<IBook> {

    constructor() {
        super(Book, appDataSource.createEntityManager());
    }

    async getBook(): Promise<IBook[]> {
        return this.createQueryBuilder('book')
            .select(['book.id', 'book.title', 'book.description', 'book.author', 'book.date', 'user.username'])
            .leftJoin('book.user', 'user')
            .orderBy('book.date', 'DESC')
            .getMany();
    }

    async createBook(bookDto: BookDto): Promise<IBook> {
        return await this.save(bookDto);
    }

    async deleteBook(id: number, userId: number): Promise<IBook | null> {
        const selectedBook = await this.findOne({ where: { userId, id } });
        if (selectedBook) await this.delete(id);
        return selectedBook;
    }

    async updateBook(id: number, bookDto: BookDto): Promise<IBook | null> {
        const existingBook = await this.findOne({ where: { id } });
        if (!existingBook) return null;
        const updatedBook = { ...existingBook, ...bookDto };
        await this.save(updatedBook);
        return updatedBook;
    }
}
