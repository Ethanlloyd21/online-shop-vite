import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItemProps } from "../../../state/typeofCarts";
import { InitialStateInterface } from "../../../state/typeofCarts";
import axios from 'axios';

//CloudFront API link of store inventory
const CLOUDFRONT_API = "https://d2i03nztde2ppv.cloudfront.net/storeInventory.json";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
  error: null,
} as InitialStateInterface;


export const getCartItems = createAsyncThunk("cart/getCartItems", async (data, thunkApi) => {

  try {
        const response = await axios.get<CartItemProps []>(CLOUDFRONT_API);
        return response;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
    }
    
  // return fetch(CLOUDFRONT_API)
  //   .then((response) => response.json())
  //   .catch((err) => console.log(err));
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item: CartItemProps) => item.id !== itemId
      );
      state.amount = state.amount - 1;
    },
    increase: (state, { payload }) => {
      console.log(payload);
      const cartItem = state.cartItems.find(
        (item: CartItemProps) => item.id === payload.id
      );
      cartItem.amount = cartItem.amount + 1;
      state.amount = state.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find(
        (item: CartItemProps) => item.id === payload.id
      );
      cartItem.amount = cartItem.amount - 1;
      state.amount = state.amount - 1;
    },
    addtoCart: (state, action) => {
      const item = action.payload;
      state.cartItems.push(item);
      state.amount = state.amount + 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item: CartItemProps) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getCartItems.fulfilled, (state) => {
        state.isLoading = false;
        // state.storeInventory = action.payload;
    })
    .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
    })
  }
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  addtoCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
