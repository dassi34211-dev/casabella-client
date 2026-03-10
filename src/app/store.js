// ייבוא פונקציית ההגדרה של הרידאקס
import { configureStore } from '@reduxjs/toolkit';
// ייבוא פרוסת המוצרים שיצרנו בעבר
import productReducer from '../features/products/productSlice';
// ייבוא פרוסת המשתמשים (auth) שיצרנו הרגע!
import authReducer from '../features/auth/authSlice';

// הקמת "המוח המרכזי" של האפליקציה שלנו
export const store = configureStore({
    reducer: {
        // חיבור המוצרים למוח
        products: productReducer,
        // חיבור המשתמשים (auth) למוח, כדי שכל האתר ידע אם אנחנו מחוברים
        auth: authReducer,
    },
});