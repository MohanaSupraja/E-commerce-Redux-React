import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  name: string;
  quantity: number;
}
interface WishItemState {
  data: WishlistItem[];
  error: boolean;
  loading: boolean;
}

const initialState: WishItemState = {
  data: [],
  error: false,
  loading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      const existingItem = state.data.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        console.log("added");
        state.data.push(action.payload);
      }
    },
    addAllWishlist(state, action: PayloadAction<WishlistItem>) {
      const existingItem = state.data.find(
        (item) => item.id === action.payload.id
      );

      if (!existingItem) {
        state.data.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<Number>) {
      console.log("removed");
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
export const wishlist = (state: any) => state.wishlist.data;
