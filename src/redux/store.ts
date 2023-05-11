import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';
import storeReducer from './features/store/storeSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
        store: storeReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;