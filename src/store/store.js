import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import shopProductSlice from "./shop/productSlice";
import shopAddressSlice from "./shop/address";
import shopOrderSlice from "./shop/orderSlice";
import shopCartSlice from "./shop/cartSlice";
import shopSearchSlice from "./shop/searchSlice";
import shopReviewSlice from "./shop/reviewSlice";

import adminProductsSlice from "./admin/productSlice";
import adminOrderSlice from "./admin/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    shopProducts: shopProductSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopCart: shopCartSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,

    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
  },
});

export default store;
