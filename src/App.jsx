// ייבוא רכיבי הליבה של הראוטינג (ניווט) מריאקט
// Routes: עוטף את כל הנתיבים, Route: מגדיר נתיב בודד, Navigate: מנתב משתמשים כוחנית (למשל אם אין להם הרשאה)
import { Routes, Route, Navigate } from 'react-router-dom';
// ייבוא כלי מרידאקס שמאפשר לנו "להאזין" למצב הגלובלי של האפליקציה (למשל, לבדוק מי מחובר)
import { useSelector } from 'react-redux';
// קובץ העיצוב הגלובלי שלנו
import './App.css';

// --- ייבוא כל הקומפוננטות (הדפים) של האתר ---
import Navbar from './components/Navbar'; // סרגל הניווט העליון
import ProductList from './features/products/ProductList'; // דף הבית - רשימת המפות
import Login from './features/auth/Login'; // דף התחברות
import Register from './features/auth/Register'; // דף הרשמה
import AddProduct from './features/products/AddProduct'; // דף הוספת/עריכת מוצר למנהלים

// --- ייבוא אזור העגלה והקופה ---
import Cart from './features/cart/Cart'; // דף עגלת הקניות
// *** חדש! ייבוא דף הקופה והתשלום שיצרנו עכשיו ***
import Checkout from './features/cart/Checkout'; 

function App() {
  // שולפים מרידאקס את פרטי המשתמש המחובר כרגע (אם יש כזה)
  // זה יעזור לנו להחליט אילו דפים מותר לו לראות (למשל דפי ניהול)
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {/* סרגל הניווט יופיע תמיד, בכל דף, מעל כל התוכן */}
      <Navbar />

      {/* הגדרת כל המסלולים האפשריים באתר שלנו */}
      <Routes>
        {/* נתיבים פתוחים לכולם (אורחים, לקוחות ומנהלים) */}
        <Route path="/" element={<ProductList />} />         {/* דף הבית */}
        <Route path="/login" element={<Login />} />          {/* התחברות */}
        <Route path="/register" element={<Register />} />    {/* הרשמה */}
        <Route path="/cart" element={<Cart />} />            {/* עגלת קניות */}
        
        {/* *** חדש! הנתיב לדף התשלום *** */}
        {/* ברגע שהלקוח לוחץ "המשך לתשלום" בעגלה, הוא יגיע לכאן */}
        <Route path="/checkout" element={<Checkout />} />

        {/* --- נתיבים מוגנים (Protected Routes) למנהלים בלבד --- */}
        {/* עמוד הוספת מוצר:
            בודקים קודם כל אם יש user, ואז בודקים אם הוא isAdmin.
            אם כן -> מציגים את AddProduct.
            אם לא (אורח או לקוח רגיל) -> זורקים אותו חזרה לדף הבית ("/") 
        */}
        <Route 
          path="/add-product" 
          element={user && user.isAdmin ? <AddProduct /> : <Navigate to="/" />} 
        />

        {/* עמוד עריכת מוצר:
            אותו היגיון של חסימה כמו בהוספה, רק שכאן יש משתנה דינמי (:id) בכתובת 
            שמייצג איזה מוצר בדיוק המנהלת רוצה לערוך.
        */}
        <Route 
          path="/edit-product/:id" 
          element={user && user.isAdmin ? <AddProduct /> : <Navigate to="/" />} 
        />
      </Routes>
    </>
  );
}

export default App;