import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InitialStateStore } from "../../../state/typeofCarts";
import axios from "axios";
import { CartItemProps } from "../../../state/typeofCarts";

//CloudFront API link of store inventory
const CLOUDFRONT_API = "https://d2i03nztde2ppv.cloudfront.net/storeInventory.json";

const initialState = {
    storeInventory: [], 
    isLoading: false,
    error: null,
} as InitialStateStore

export const getCartItems = createAsyncThunk("cart/getCartItems", async (_, thunkApi) => {
    try {
        const response = await axios.get<CartItemProps>(CLOUDFRONT_API);
        return response.data;
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
    }
    
//   return fetch(CLOUDFRONT_API)
//     .then((response) => response.json())
//     .catch((err) => console.log(err));
});

const storeSlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getCartItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCartItems.fulfilled, (state, action) => {
            console.log(state.storeInventory)
            state.isLoading = false;
            state.storeInventory = action.payload;
        })
        .addCase(getCartItems.rejected, (state) => {
            state.isLoading = false;
        })
      }
    
})


export default storeSlice.reducer;