import { Routes, Route } from 'react-router-dom';
import './App.css';

// ייבוא הקומפוננטות שלנו
import Navbar from './components/Navbar';
import ProductList from './features/products/ProductList';
import Login from './features/auth/Login';

function App() {
  return (
    <>
      {/* ה-Navbar יופיע תמיד למעלה, בכל עמוד */}
      <Navbar />

      {/* כאן מוגדרים המסלולים - איזה עמוד יוצג בכל כתובת */}
      <Routes>
        {/* כשהכתובת היא הרגילה (/), נציג את רשימת המוצרים */}
        <Route path="/" element={<ProductList />} />
        
        {/* כשהכתובת היא /login, נציג את עמוד ההתחברות */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
