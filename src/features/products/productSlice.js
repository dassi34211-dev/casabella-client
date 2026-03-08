import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts } from '../../services/product.service';

// פונקציה אסינכרונית ששואבת את המוצרים מהשרת ושומרת אותם במוח המרכזי
export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const data = await getAllProducts();
        return data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],       // כאן יישמרו המוצרים
        status: 'idle',  // מצב הטעינה: 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {}, // כאן נוסיף בעתיד פעולות רגילות כמו "הוסף לעגלה"
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // מכניסים את המידע שהגיע מהשרת לתוך ה-Store
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;