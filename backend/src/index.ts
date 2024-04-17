import 'reflect-metadata';
import App from './app';
import logger from './middlewares/logger';
import cors from 'cors';
import { BookRouter } from './routes/book.routes';
import { AuthRouter } from './routes/auth.router';

const app = new App({
  port: 8000,
  middlewares: [logger(), cors()],
  routers: [new BookRouter(), new AuthRouter()],
});

app.listen();