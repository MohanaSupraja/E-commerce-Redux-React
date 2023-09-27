import { Store, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";

interface ProductItem {
  proData: any[];
}
export const getProducts = createAsyncThunk("products", async () => {
  const response = await axios.get("http://localhost:3002/products");
  // const response = await axios.get("https://fakestoreapi.com/products");
  console.log(response.data);
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: { proData: [] } as ProductItem,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.rejected, (state) => {
        state.proData = [];
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.proData = action.payload;
      });
  },
});
export default productSlice.reducer;
export const proData = (state: any) => state.products.proData;
