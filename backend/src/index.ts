const dotenv=require('dotenv').config();
const express = require("express");
import { Request, Response } from 'express';
import authRouter from './routes/authRoutes';
import productRouter from './routes/productRoutes';
import bodyParser from 'body-parser';
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.use('/products', productRouter);
app.use('/user',authRouter);











app.use('/', (req: Request, res: Response) => {
  res.send(`Hello from Server at port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
