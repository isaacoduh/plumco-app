import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shopProductSlice from "./shop/productSlice";
import shopAddressSlice from "./shop/address";

const store = configureStore({
  reducer: {
    auth: authReducer,

    shopProducts: shopProductSlice,
    shopAddress: shopAddressSlice,
  },
});

export default store;
