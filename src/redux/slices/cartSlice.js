import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch cart data from API
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await fetch("http://localhost:3000/carts");
  return response.json();
});

// Add to cart API call
export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async (cartItem) => {
    const cartResponse = await fetch("http://localhost:3000/carts");
    const cartItems = await cartResponse.json();

    // Check if product already exists in cart
    const existingItem = cartItems.find(
      (item) => item.productId === cartItem.productId
    );

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + cartItem.quantity,
        totalAmount:
          (existingItem.quantity + cartItem.quantity) * existingItem.price,
      };

      await fetch(`http://localhost:3000/carts/${existingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      return updatedItem;
    } else {
      const response = await fetch("http://localhost:3000/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });
      return response.json();
    }
  }
);

// Remove from cart API call
export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCartAPI",
  async (id) => {
    await fetch(`http://localhost:3000/carts/${id}`, { method: "DELETE" });
    return id;
  }
);

// Update quantity API call
export const updateQuantityAPI = createAsyncThunk(
  "cart/updateQuantityAPI",
  async ({ id, quantity }) => {
    const response = await fetch(`http://localhost:3000/carts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    return response.json();
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] }, // ✅ Ensure property name matches everywhere
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload || [];
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateQuantityAPI.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index].quantity = action.payload.quantity;
        }
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
