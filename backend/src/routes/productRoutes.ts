import { ProductController } from "../controllers/productController";

import express, { Router } from 'express';

const productRouter: Router = express.Router();
const productController = new ProductController();

productRouter.get("/", productController.getProducts.bind(productController));

export default productRouter;