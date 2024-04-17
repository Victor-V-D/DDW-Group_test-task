import { RequestHandler } from 'express';
import IRoute from './IRoute.interface';

interface IAppInit {
  port: number;
  middlewares: RequestHandler[];
  routers: IRoute[];
};

export default IAppInit;