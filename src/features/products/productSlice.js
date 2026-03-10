// ייבוא הפונקציות מרידאקס וספריית אקסיוס לתקשורת מול השרת
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// כתובת השרת שלנו
const API_URL = 'http://localhost:5000/api';

// פונקציה אסינכרונית לשליפת כל המוצרים מהשרת
export const fetchProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  }
);

// פונקציה אסינכרונית להוספת מוצר חדש (כולל תמונה)
export const addProductAsync = createAsyncThunk(
  'products/addProduct',
  async ({ formData, token }) => {
    // שליחת בקשת POST עם FormData (בשביל התמונה) והטוקן של המנהל
    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        'x-auth-token': token,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
);

// הפונקציה ששאלת עליה: מחיקת מוצר מהשרת
export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async ({ id, token }) => {
    // שליחת בקשת DELETE עם שתי אפשרויות לטוקן כדי למנוע שגיאות 500
    const response = await axios.delete(`${API_URL}/products/${id}`, {
      headers: {
        'x-auth-token': token,
        'Authorization': `Bearer ${token}`
      }
    });
    // מחזירים את ה-ID כדי שהרידאקס ידע איזה מוצר להעלים מהמסך
    return id;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // טיפול בשליפת מוצרים
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      // טיפול בהוספת מוצר - דוחף את המוצר החדש למערך הקיים
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // טיפול במחיקת מוצר - מסנן החוצה את המוצר שנמחק
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product._id !== action.payload);
      });
  },
});

export default productSlice.reducer;