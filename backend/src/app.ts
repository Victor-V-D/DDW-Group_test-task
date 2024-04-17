import express from 'express';
import { Application, RequestHandler } from 'express';
import IAppInit from './interfaces/IAppInit.interface';
import IRoute from './interfaces/IRoute.interface';
import { appDataSource } from './config/appDataSource';

class App {
  public app: Application;
  public port: number;

  constructor(appInit: IAppInit) {
    this.app = express();
    this.port = appInit.port;

    this.initAssets();
    this.initMiddlewares(appInit.middlewares);
    this.initRoutes(appInit.routers);
  };

  private initAssets() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
  };

  private initMiddlewares(middlewares: RequestHandler[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  };

  private initRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  };

  public async listen() {
    await appDataSource.initialize();
    this.app.listen(this.port, () => {
      console.log(`App listening  on the http://localhost:${this.port}`);
    });
    process.on('exit', () => {
      appDataSource.destroy();
    });
  };
};

export default App;