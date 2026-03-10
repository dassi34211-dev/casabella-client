import { useEffect } from 'react';
// ייבוא הפונקציות שמאפשרות לנו לתקשר עם המוח המרכזי של רידאקס
import { useDispatch, useSelector } from 'react-redux';
// ייבוא הפעולה שמושכת את המוצרים מהשרת
import { fetchProductsAsync } from './productSlice';
// ייבוא רכיבי עיצוב מ-MUI עבור כפתורי המנהל (Button) וסידור שלהם בשורה (Box)
import { Button, Box } from '@mui/material';

export default function ProductList() {
  // הכנת פונקציית השיגור (dispatch) כדי להפעיל פעולות ברידאקס
  const dispatch = useDispatch();
  
  // שליפת רשימת המוצרים, סטטוס הטעינה ושגיאות אפשריות מתוך פרוסת המוצרים ברידאקס
  const { items: products, status, error } = useSelector((state) => state.products);
  
  // שליפת המשתמש המחובר מתוך פרוסת המשתמשים (auth) ברידאקס
  // זה ה"קסם" שיאפשר לנו לדעת אם להציג כפתורי מחיקה/עריכה!
  const user = useSelector((state) => state.auth.user);

  // useEffect שרץ פעם אחת כשהקומפוננטה נטענת למסך
  useEffect(() => {
    // בודק אם עדיין לא משכנו נתונים (idle), ואם כן - משגר את הבקשה לשרת
    if (status === 'idle') {
      dispatch(fetchProductsAsync());
    }
  }, [status, dispatch]);

  // פונקציה זמנית שתופעל כשהמנהל ילחץ על מחיקה (בהמשך נחבר אותה לשרת האמיתי)
  const handleDelete = (id) => {
    console.log("המנהל ביקש למחוק את המוצר עם ה-ID:", id);
    alert("כאן תהיה פעולת המחיקה לשרת!");
  };

  // פונקציה זמנית שתופעל כשהמנהל ילחץ על עריכה
  const handleEdit = (id) => {
    console.log("המנהל ביקש לערוך את המוצר עם ה-ID:", id);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      
      {/* כותרת העמוד */}
      <h1>המוצרים שלנו 🛋️</h1>

      {/* תצוגה מותנית: הודעת טעינה כשהשרת חושב */}
      {status === 'loading' && <p>טוען מוצרים...</p>}
      
      {/* תצוגה מותנית: הודעת שגיאה באדום אם השרת נפל */}
      {status === 'failed' && <p style={{ color: 'red' }}>שגיאה בטעינת המוצרים: {error}</p>}
      
      {/* תצוגה מותנית: אם הכל הצליח אבל אין מפות במסד הנתונים */}
      {status === 'succeeded' && products.length === 0 && <p>לא נמצאו מוצרים במסד הנתונים.</p>}

      {/* קונטיינר שעוטף את כל כרטיסי המפות בסידור גמיש */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* עוברים על כל המוצרים במערך ומייצרים לכל אחד כרטיסייה משלו */}
        {status === 'succeeded' && products.map((p) => (
          
          <div key={p._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '15px', backgroundColor: '#fff', width: '280px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            
            {/* תמונת המוצר */}
            <img src={`http://localhost:5000/${p.image}`} alt={p.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
            
            {/* שם המוצר */}
            <h3 style={{ color: '#333', margin: '15px 0 5px 0' }}>{p.name}</h3>
            
            {/* מחיר המוצר */}
            <p style={{ fontWeight: 'bold', color: '#b18e6a', fontSize: '1.2rem' }}>{p.price} ₪</p>

            {/* החלק של הרשאות המנהל! */}
            {/* בודק שני תנאים: 1. האם יש משתמש מחובר? 2. האם הוא מוגדר כמנהל? */}
            {/* רק אם שני התנאים מתקיימים, הכפתורים יוצגו על המסך */}
            {user && user.isAdmin && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                
                {/* כפתור עריכה */}
                <Button variant="outlined" color="primary" onClick={() => handleEdit(p._id)}>
                  עריכה
                </Button>
                
                {/* כפתור מחיקה */}
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