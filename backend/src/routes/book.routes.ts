import { BookController } from '../controllers/book.controller';
import IRoute from '../interfaces/IRoute.interface';
import authenticateUser from '../middlewares/authenticateUser';
import { upload } from '../middlewares/upload';
import { Router } from 'express';

export class BookRouter implements IRoute {
    path: string = '/book';
    router: Router = Router();
    private controller: BookController;

    constructor() {
        this.controller = new BookController();
        this.init();
    }

    private init() {
        this.router.get('/', this.controller.getBook);
        this.router.post('/', authenticateUser, upload.single('image'),
            this.controller.createBook);
        this.router.delete('/:id', authenticateUser, this.controller.deleteBook);
        this.router.put('/:id', authenticateUser, this.controller.updateBook);
    }
}