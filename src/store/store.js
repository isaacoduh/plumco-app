import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shopProductSlice from "./shop/productSlice";
import shopAddressSlice from "./shop/address";
import shopOrderSlice from "./shop/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    shopProducts: shopProductSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
  },
});

export default store;
