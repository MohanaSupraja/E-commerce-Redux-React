
import express, { Router } from 'express';
import { UserController } from '../controllers/userController';
const authRouter: Router = express.Router();
const userController = new UserController();

authRouter.post('/register',  userController.registerUser.bind(userController));
authRouter.post('/login',  userController.loginUser.bind(userController));


export default authRouter;

