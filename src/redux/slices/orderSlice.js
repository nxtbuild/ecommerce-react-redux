import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";

export const placeOrderAPI = createAsyncThunk(
  "order/placeOrderAPI",
  async (customerDetails, { dispatch }) => {
    try {
      // Fetch all cart items

      const cartResponse = await fetch("http://localhost:3000/carts");
      const cartItems = await cartResponse.json();

      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      // Create Order object incluing customer details

      const order = {
        ...customerDetails,
        Items: cartItems,
        totalAmount: cartItems.reduce((acc, item) => acc + item.totalAmount, 0),
        orderDate: new Date().toISOString(),
      };

      // Save the order to database

      const orderResponse = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to place order");
      }

      // Deelete cart

      for (const item of cartItems) {
        await fetch(`http://localhost:3000/carts/${item.id}`, {
          method: "DELETE",
        });
      }

      // Dispatch an action to clear cart in redux store

      dispatch(clearCart());

      return order;
    } catch (error) {
      console.log(error);
    }
  }
);
