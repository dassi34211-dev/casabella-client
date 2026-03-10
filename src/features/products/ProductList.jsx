import { useEffect } from 'react';
// ייבוא הפונקציות שמאפשרות לנו לתקשר עם המוח המרכזי של רידאקס
import { useDispatch, useSelector } from 'react-redux';
// ייבוא ה-Hook שמאפשר לנו לעבור בין עמודים (הכרטיס שלנו לעמוד העריכה)
import { useNavigate } from 'react-router-dom'; 
// ייבוא הפעולות של משיכת מוצרים ומחיקת מוצרים מה-slice שלנו
import { fetchProductsAsync, deleteProductAsync } from './productSlice';
// ייבוא רכיבים בסיסיים מ-Material UI
import { Button, Box } from '@mui/material';

export default function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // אתחול פונקציית הניווט

  // שליפת המידע על המוצרים והסטטוס שלהם מהרידאקס
  const { items: products, status, error } = useSelector((state) => state.products);
  
  // שליפת המשתמש המחובר והטוקן שלו (לבדיקת הרשאות מנהל)
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // שימוש ב-useEffect כדי למשוך את המוצרים מהשרת כשהקומפוננטה עולה
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  // פונקציה למחיקת מוצר
  const handleDelete = (id) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק מוצר זה לצמיתות?")) {
      dispatch(deleteProductAsync({ id, token }));
    }
  };

  // פונקציה למעבר לעמוד עריכה - עכשיו היא באמת מנווטת!
  const handleEdit = (id) => {
    // הניווט מעביר אותנו לכתובת של עמוד העריכה עם ה-ID הייחודי של המוצר
    navigate(`/edit-product/${id}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      
      <h1>המוצרים שלנו 🛋️</h1>

      {/* הצגת הודעות סטטוס (טעינה, שגיאה או רשימה ריקה) */}
      {status === 'loading' && <p>טוען מוצרים...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>שגיאה בטעינת המוצרים: {error}</p>}
      {status === 'succeeded' && products.length === 0 && <p>לא נמצאו מוצרים במסד הנתונים.</p>}

      {/* המכולה המרכזית בעיצוב המקורי שלך - Flexbox */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        
        {status === 'succeeded' && products.map((p) => (
          
          /* כרטיס מוצר בעיצוב המקורי */
          <div key={p._id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '15px', 
            backgroundColor: '#fff', 
            width: '280px', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
          }}>
            
            {/* תמונת המוצר */}
            <img 
              src={`http://localhost:5000/${p.image}`} 
              alt={p.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} 
            />
            
            <h3 style={{ color: '#333', margin: '15px 0 5px 0' }}>{p.name}</h3>
            <p style={{ fontWeight: 'bold', color: '#b18e6a', fontSize: '1.2rem' }}>{p.price} ₪</p>

            {/* כפתורי ניהול שמופיעים רק אם המשתמש הוא מנהל */}
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