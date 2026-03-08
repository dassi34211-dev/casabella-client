import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/logo.webp';
import { getAllProducts } from './services/product.service';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("מנסה לשלוף מוצרים מהשרת...");
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("שגיאה בחיבור לשרת:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <img src={logo} alt="Casa Bella Logo" style={{ width: '200px' }} />
      <h1>המוצרים שלנו 🛋️</h1>

      {loading && <p>טוען מוצרים...</p>}
      
      {!loading && products.length === 0 && <p>לא נמצאו מוצרים במסד הנתונים.</p>}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((p) => (
          <div key={p._id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '15px', 
            backgroundColor: '#fff', 
            width: '280px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
          }}>
            <img 
              src={`http://localhost:5000/${p.image}`} 
              alt={p.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} 
            />
            <h3 style={{ color: '#333', margin: '15px 0 5px 0' }}>{p.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#b18e6a', fontSize: '1.2rem' }}>{p.price} ₪</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;