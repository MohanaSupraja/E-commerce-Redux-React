
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
const UserService = require('../services/userService');
import generateToken from "../config/jwtToken";

const bcrypt=require('bcrypt');
const userService = new UserService();

export class UserController {
  public async registerUser(req: Request, res: Response) {
    try {
       
      const email = req.body.email;
      const password = req.body.password;
      const id=req.body.id;
    //   const hashedPassword = await this.hashPassword(password);
    //   console.log("register :",hashedPassword);
      const findUser = await userService. findUserByEmail( email, password);

      if (!findUser) {
       
        const newUser = await userService.registerUser(req.body);
      //  console.log(newUser);
        res.status(201).json(newUser);
      } else {
        res.status(200).json({ error: 'User already exists' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
  public async loginUser(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      
    //   const hashedPassword = await this.hashPassword(password);
    //  console.log("Login 1: ",hashedPassword);

    const findUser = await userService.findUserByEmail(email, password);
    //   const hashedPassword2 = await this.hashPassword(findUser.password);
    //   console.log("Login 2: ",hashedPassword2);
    //console.log(findUser);
      if (!findUser) {
        res.status(400).json({error: 'User not found' });
      } else {
       
        const token = generateToken(findUser.email);
      
        res.status(200).json({ message: 'Login Success', user: findUser, token });
        
      }
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }

 public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

}


