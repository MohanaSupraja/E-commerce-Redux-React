const axios = require("axios");
export class ProductService {

  async fetchProducts() {

    try {

      const response = await axios.get("https://fakestoreapi.com/products");

      return response.data;

    } catch (error) {

      throw error;

    }

  }

  

}

 