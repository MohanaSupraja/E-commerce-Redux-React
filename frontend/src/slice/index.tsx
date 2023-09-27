import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice"; // Make sure to import the reducer correctly
import productSlice from "./productSlice";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import wishSlice from "./wishSlice";
import { getAllByRole } from "@testing-library/react";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    wishlist: wishSlice,
    auth: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
