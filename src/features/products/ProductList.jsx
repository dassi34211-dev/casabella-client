import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAsync } from './productSlice';

export default function ProductList() {
  const dispatch = useDispatch();
  
  // שולפים את המידע מה-Redux
  const { items: products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>המוצרים שלנו 🛋️</h1>

      {status === 'loading' && <p>טוען מוצרים...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>שגיאה בטעינת המוצרים: {error}</p>}
      {status === 'succeeded' && products.length === 0 && <p>לא נמצאו מוצרים במסד הנתונים.</p>}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {status === 'succeeded' && products.map((p) => (
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