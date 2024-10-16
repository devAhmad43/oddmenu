import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Treat cartItems as an array
  products: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      const productId = action.payload.id;
      const product = state.cartItems.find(item => item.id === productId);

      if (product) {
        product.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeProduct: (state, action) => {
      const productId = action.payload.id;
      const product = state.cartItems.find(item => item.id === productId);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== productId);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    },
    getTotal: (state) => {
      state.totalAmount = state.cartItems.reduce((total, item) => {
        const price = item.price || 0; // Fallback to 0 if item.price is undefined
        const quantity = item.quantity || 0; // Fallback to 0 if item.quantity is undefined
        return total + price * quantity;
      }, 0);
    },
    //delet whole product
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      )
    },

  },
});

export const selectProducts = (state) => state.cart.products;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.totalAmount;

export const { addProduct, addProducts,removeFromCart,  removeProduct, clearCart, getTotal } = cartSlice.actions;
export default cartSlice.reducer;
