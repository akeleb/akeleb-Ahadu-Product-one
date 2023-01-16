import { configureStore } from "@reduxjs/toolkit";
//ConfigureStoreOptions
import cartSlice from "./slices/cartSlice";


const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;
