import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

// ייבוא הקומפוננטות שלנו
import Navbar from './components/Navbar';
import ProductList from './features/products/ProductList';
import Login from './features/auth/Login';
import AddProduct from './features/products/AddProduct'; 
import Register from './features/auth/Register';

// --- הוספנו את הייבוא של העגלה! ---
import Cart from './features/cart/Cart'; 

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- הוספנו את הנתיב החדש לעגלת הקניות --- */}
        <Route path="/cart" element={<Cart />} />

        {/* עמוד הוספת מוצר - מוגן למנהל בלבד */}
        <Route 
          path="/add-product" 
          element={user && user.isAdmin ? <AddProduct /> : <Navigate to="/" />} 
        />

        {/* עמוד עריכת מוצר */}
        <Route 
          path="/edit-product/:id" 
          element={user && user.isAdmin ? <AddProduct /> : <Navigate to="/" />} 
        />
      </Routes>
    </>
  );
}

export default App;