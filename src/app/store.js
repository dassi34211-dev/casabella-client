import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
    reducer: {
        products: productReducer, // מחברים את פרוסת המוצרים למוח המרכזי
        // בהמשך נוסיף כאן גם את משתמשים (auth), עגלה (cart) וכו'
    },
});