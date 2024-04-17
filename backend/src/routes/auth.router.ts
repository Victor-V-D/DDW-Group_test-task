import { Router } from "express";
import IRoute from "../interfaces/IRoute.interface";
import { AuthController } from "../controllers/auth.controller";

export class AuthRouter implements IRoute {
  public path: string = '/users';
  public router: Router = Router();
  private controller: AuthController = new AuthController();

  constructor() {
    this.init();
  };

  private init = (): void => {
    this.router.post('/', this.controller.registerHandler);
    this.router.post('/sessions', this.controller.signInHandler);
  };
};