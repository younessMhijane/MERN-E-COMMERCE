import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "./features/auth/authSlice";
import cartReducer from "./features/cart/cartSlice";
import searchReducer from "./features/search/searchSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    search: searchReducer,
  },




});

setupListeners(store.dispatch);
export default store;