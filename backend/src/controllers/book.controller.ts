import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { BookService } from '../services/book.service';
import { BookDto } from '../dto/book.dto';
import { formatErrors } from '../helper/formatError';
import { IUser } from '../interfaces/IUser.interface';

export class BookController {
    private service: BookService;

    constructor() {
        this.service = new BookService();
    }

    getBook: RequestHandler = async (req, res) => {
        try {
            res.send(await this.service.getBook());
        } catch {
            res.status(500).send({ message: `Internal server error` });
        }
    };

    createBook: RequestHandler = async (req, res) => {
        const user = req.app.locals.user as IUser;
        const bookUserId = { ...req.body, userId: user.id.toString() };
        const bookDto = plainToInstance(BookDto, bookUserId, { excludeExtraneousValues: true });

        try {
            const newBook = await this.service.createBook(bookDto);
            res.send(newBook);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).send(formatErrors(error));
            } else {
                res.status(500).send({ message: `Internal server error` });
            }
        }
    };

    deleteBook: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.app.locals.user as IUser;
            const result = await this.service.deleteBook(parseInt(id), user.id);

            if (result) {
                res.send(result);
            } else {
                res.status(400).send({ message: `Не удалось удалить пост` });
            }
        } catch (error) {
            res.status(500).send({ message: `Internal server error` });
        }
    };

    updateBook: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const user = req.app.locals.user as IUser;

            if (!user) {
                res.status(401).send({ message: `Unauthorized user` });
                return;
            }

            const bookDto = plainToInstance(BookDto, req.body, { excludeExtraneousValues: true });
            const updatedBook = await this.service.updateBook(parseInt(id), bookDto);

            if (!updatedBook) {
                res.status(404).send({ message: `Book with id ${id} not found` });
                return;
            }

            res.send(updatedBook);
        } catch (error) {
            if (Array.isArray(error)) {
                res.status(400).send(formatErrors(error));
            } else {
                res.status(500).send({ message: `Internal server error` });
            }
        }
    };
}
