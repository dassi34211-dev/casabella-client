// ייבוא הפונקציה שיוצרת פרוסת מידע (Slice) בתוך המוח המרכזי של רידאקס
import { createSlice } from '@reduxjs/toolkit';

// פונקציית עזר קטנה שאנחנו יוצרים כדי לפענח את הטוקן שהשרת שלח לנו
// ככה נדע מיד אם המשתמש הוא מנהל (isAdmin) בלי לעשות עוד בקשה לשרת
const decodeToken = (token) => {
    try {
        // הטוקן מחולק ל-3 חלקים עם נקודות. החלק האמצעי [1] מכיל את המידע שלנו
        const payload = token.split('.')[1];
        // אנחנו מפענחים את הקידוד (atob) והופכים אותו לאובייקט (JSON.parse)
        return JSON.parse(atob(payload));
    } catch (e) {
        // אם משהו משתבש בפענוח, נחזיר null (כלום)
        return null;
    }
};

// הגדרת המצב הראשוני (initialState) כשהאתר עולה
const initialState = {
    // אנחנו בודקים אם יש כבר טוקן ששמור בזיכרון של הדפדפן (localStorage) מביקור קודם
    token: localStorage.getItem('token') || null,
    // אם מצאנו טוקן, אנחנו מיד מפענחים אותו כדי לדעת מי המשתמש. אם לא, המשתמש הוא null
    user: localStorage.getItem('token') ? decodeToken(localStorage.getItem('token')) : null,
};

// יצירת ה-Slice של משתמשים (auth)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    // reducers הם הפעולות שאפשר לבצע על המידע שלנו
    reducers: {
        // פעולה שמופעלת כשהמשתמש מתחבר בהצלחה (מקבלת את הטוקן מהשרת)
        setLogin: (state, action) => {
            // שמירת הטוקן בתוך הרידאקס
            state.token = action.payload;
            // פענוח ושמירת פרטי המשתמש (כמו מזהה והאם הוא מנהל)
            state.user = decodeToken(action.payload);
            // שמירת הטוקן בזיכרון של הדפדפן כדי שהמשתמש יישאר מחובר גם אם ירענן את הדף
            localStorage.setItem('token', action.payload);
        },
        // פעולה שמופעלת כשהמשתמש רוצה להתנתק
        setLogout: (state) => {
            // מחיקת הטוקן ופרטי המשתמש מהרידאקס
            state.token = null;
            state.user = null;
            // מחיקת הטוקן מהזיכרון של הדפדפן (localStorage)
            localStorage.removeItem('token');
        }
    }
});

// ייצוא הפעולות (Login ו-Logout) כדי שנוכל להפעיל אותן מקומפוננטות אחרות (כמו עמוד ההתחברות)
export const { setLogin, setLogout } = authSlice.actions;

// ייצוא ה-Reducer עצמו כדי שנוכל לחבר אותו למוח הראשי (store.js)
export default authSlice.reducer;