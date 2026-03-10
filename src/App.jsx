import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // ייבוא כדי לבדוק אם המשתמש הוא מנהל
import './App.css';

// ייבוא הקומפוננטות שלנו
import Navbar from './components/Navbar';
import ProductList from './features/products/ProductList';
import Login from './features/auth/Login';
import AddProduct from './features/products/AddProduct'; // נשתמש באותה קומפוננטה גם לעריכה

function App() {
  // שליפת המשתמש מהמוח המרכזי (Redux)
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {/* ה-Navbar יופיע תמיד למעלה, בכל עמוד */}
      <Navbar />

      <Routes>
        {/* דף הבית - רשימת המפות */}
        <Route path="/" element={<ProductList />} />
        
        {/* עמוד התחברות */}
        <Route path="/login" element={<Login />} />

        {/* עמוד הוספת מוצר - מוגן למנהל בלבד! */}
        <Route 
          path="/add-product" 
          element={user && user.isAdmin ? <AddProduct /> : <Navigate to="/" />} 
        />

        {/* --- עמוד עריכת מוצר --- */}
        {/* השתמשנו ב-":id" כדי שהכתובת תהיה דינמית לכל מפה ומפה */}
        <Route 
          path="/edit-product/:id" 
          element={user && user.isAdmin ? <AddProduct /> : <Navigate to="/" />} 
        />

      </Routes>
    </>
  );
}

export default App;