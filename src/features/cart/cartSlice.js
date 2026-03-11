import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // הוספת מוצר (או העלאת כמות)
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      
      state.totalAmount += product.price;
    },
    
    // --- הנה הפונקציה החדשה למינוס! ---
    removeFromCart: (state, action) => {
      const id = action.payload; // כאן אנחנו מקבלים רק את ה-ID של המוצר
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        // קודם כל מורידים את המחיר מהסך הכללי
        state.totalAmount -= existingItem.price;
        
        // אם יש רק אחד, נמחוק אותו לגמרי מהרשימה
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(item => item._id !== id);
        } else {
          // אחרת, רק נוריד את הכמות ב-1
          existingItem.quantity -= 1;
        }
      }
    },

    // ריקון כל העגלה (שימושי לאחרי תשלום)
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    }
  }
});

// שימי לב שעכשיו אנחנו מייצאים גם את removeFromCart!
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;