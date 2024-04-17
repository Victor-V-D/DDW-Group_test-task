import { RequestHandler } from 'express';
import { AuthService } from '../services/auth.service';
import genErrorResponse from '../helper/genErrorResponse';
import IError from '../interfaces/IError.interface';

const authService = new AuthService();

const authenticateUser: RequestHandler = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) throw genErrorResponse("AUTHENTICATION_ERROR", ["No token present"]);

    const user = await authService.getUserByToken(token);
    req.app.locals.user = user;
    
    next();
  } catch (e) {
    const error = e as IError;
    
    if (error.type === "AUTHENTICATION_ERROR") res.status(401).send(e);
    else res.status(500).send(genErrorResponse("INTERNAL_ERROR", ["Internal server error"]));
  }

};

export default authenticateUser;