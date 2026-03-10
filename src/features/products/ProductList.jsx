import { useEffect } from 'react';
// ייבוא הפונקציות שמאפשרות לנו לתקשר עם המוח המרכזי של רידאקס
import { useDispatch, useSelector } from 'react-redux';
// ייבוא הפעולות של משיכת מוצרים ומחיקת מוצרים מה-slice שלנו
import { fetchProductsAsync, deleteProductAsync } from './productSlice';
import { Button, Box } from '@mui/material';

export default function ProductList() {
  const dispatch = useDispatch();
  
  const { items: products, status, error } = useSelector((state) => state.products);
  
  // שליפת המשתמש המחובר כדי לדעת אם להציג כפתורי מנהל
  const user = useSelector((state) => state.auth.user);
  
  // שליפת האסימון (טוקן) של המשתמש. השרת דורש את זה כדי לאשר מחיקה!
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  // הפונקציה האמיתית שתופעל כשהמנהל ילחץ על מחיקה
  const handleDelete = (id) => {
    // שלב הגנה: חלון קופץ שמוודא שהמנהל לא לחץ בטעות
    if (window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה לצמיתות?")) {
      // אם המנהל אישר, אנחנו משגרים (dispatch) את פעולת המחיקה לרידאקס
      // ושולחים לה אובייקט עם ה-ID של המוצר וגם את הטוקן של המנהל
      dispatch(deleteProductAsync({ id, token }));
    }
  };

  const handleEdit = (id) => {
    console.log("המנהל ביקש לערוך את המוצר עם ה-ID:", id);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      
      <h1>המוצרים שלנו 🛋️</h1>

      {status === 'loading' && <p>טוען מוצרים...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>שגיאה בטעינת המוצרים: {error}</p>}
      {status === 'succeeded' && products.length === 0 && <p>לא נמצאו מוצרים במסד הנתונים.</p>}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        
        {status === 'succeeded' && products.map((p) => (
          
          <div key={p._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '15px', backgroundColor: '#fff', width: '280px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            
            <img src={`http://localhost:5000/${p.image}`} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
            
            <h3 style={{ color: '#333', margin: '15px 0 5px 0' }}>{p.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#b18e6a', fontSize: '1.2rem' }}>{p.price} ₪</p>

            {/* הצגת כפתורי העריכה והמחיקה רק אם המשתמש הוא מנהל */}
            {user && user.isAdmin && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                
                <Button variant="outlined" color="primary" onClick={() => handleEdit(p._id)}>
                  עריכה
                </Button>
                
                <Button variant="outlined" color="error" onClick={() => handleDelete(p._id)}>
                  מחיקה
                </Button>

              </Box>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}