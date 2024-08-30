import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shopProductSlice from "./shop/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    shopProducts: shopProductSlice,
  },
});

export default store;
