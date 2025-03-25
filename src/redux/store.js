import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./slices/cartSlice";
// import orderReducer from "./slices/orderSlice";


export const store = configureStore({
  reducer: { cart: cartReducer,
    },
})