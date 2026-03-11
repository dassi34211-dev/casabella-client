// ייבוא רכיבי הליבה של הראוטינג (ניווט) מריאקט
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import Navbar from './components/Navbar'; 
import ProductList from './features/products/ProductList'; 
import Login from './features/auth/Login'; 
import Register from './features/auth/Register'; 
import AddProduct from './features/products/AddProduct'; 

import Cart from './features/cart/Cart'; 
import Checkout from './features/cart/Checkout'; 
// *** חדש! ייבוא דף ההזמנות שלי ***
import MyOrders from './features/orders/MyOrders'; 

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProductList />} />        
        <Route path="/login" element={<Login />} />          
        <Route path="/register" element={<Register />} />    
        <Route path="/cart" element={<Cart />} />            
        <Route path="/checkout" element={<Checkout />} />
        
        {/* *** חדש! הנתיב לדף ההזמנות שלי *** */}
        <Route path="/my-orders" element={<MyOrders />} />

        {/* --- נתיבים מוגנים למנהלים בלבד --- */}
        <Route 
          path="/add-product" 
          element={user && user.isAdmin ? <AddProduct /> : <Navigate to="/" />} 
        />
        <Route 
          path="/edit-product/:id" 
          element={user && user.isAdmin ? <AddProduct /> : <Navigate to="/" />} 
        />
      </Routes>
    </>
  );
}

export default App;