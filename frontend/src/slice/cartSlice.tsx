import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseOptions } from "vm";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartItemState {
  data: CartItem[];
  error: boolean;
  loading: boolean;
}

const initialState: CartItemState = {
  data: [],
  error: false,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    add(state, action: PayloadAction<CartItem>) {
      const existingItem = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.data.push({ ...action.payload, quantity: 1 });
      }
    },

    removeall(state, action: PayloadAction<number>) {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    removeallcart(state) {
      state.data = [];
    },

    remove(state, action: PayloadAction<number>) {
      const existingItem = state.data.find(
        (item) => item.id === action.payload
      );
      if (existingItem && existingItem.quantity === 1) {
        state.data = state.data.filter((item) => item.id !== action.payload);
      } else {
        state.data = state.data.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    },
  },
});

export const { add, removeall, remove, removeallcart } = cartSlice.actions;
export default cartSlice.reducer;
export const cart = (state: any) => state.cart.data;
