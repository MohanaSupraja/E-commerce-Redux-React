
import { ProductService } from "../services/productServices"

import { Request, Response } from "express";

const productService = new ProductService();

export class ProductController {

  public async getProducts(req: Request, res: Response): Promise<void> {

    try {

      const products = await productService.fetchProducts();

      res.json(products);

    } catch (error) {

      res.status(500).json({ error: "Internal Server Error" });

    }

  }

}

 