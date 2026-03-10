import { useState, useEffect } from 'react';
// ייבוא פונקציות מרידאקס כדי לדבר עם "המוח" של האפליקציה
import { useDispatch, useSelector } from 'react-redux';
// useParams: מושך נתונים מהכתובת (למשל ה-ID). useNavigate: מעביר אותנו עמוד.
import { useParams, useNavigate } from 'react-router-dom';
// ייבוא הפעולות שמוסיפות או מעדכנות מוצרים בשרת
import { addProductAsync, updateProductAsync } from './productSlice';
// ייבוא רכיבי עיצוב מוכנים מ-Material UI
import { Button, TextField, Box, Typography, Container } from '@mui/material';

export default function AddProduct() {
  // 1. הגדרת כלי העבודה שלנו
  const { id } = useParams(); // לוכד את ה-ID משורת הכתובת (אם קיים)
  const navigate = useNavigate(); // מאפשר לנו "לנסוע" לעמוד אחר בקוד
  const dispatch = useDispatch(); // מאפשר לנו לשגר פעולות לרידאקס

  // 2. זיהוי המצב: אם יש ID בכתובת, סימן שאנחנו עורכים מוצר קיים
  const isEdit = Boolean(id);

  // 3. שליפת המוצר שאנחנו רוצים לערוך מתוך רשימת המוצרים ברידאקס
  const productToEdit = useSelector((state) =>
    state.products.items.find((p) => p._id === id)
  );

  // שליפת הטוקן של המנהל (כדי שהשרת ירשה לנו להוסיף/לעדכן)
  const token = useSelector((state) => state.auth.token);

  // 4. הגדרת המשתנים של הטופס
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  
  // *** חדש! משתנה לשמירת הקישור של התצוגה המקדימה ***
  const [preview, setPreview] = useState(null); 

  // 5. מילוי אוטומטי של הטופס בעריכה (כולל תצוגה של התמונה הקיימת!)
  useEffect(() => {
    if (isEdit && productToEdit) {
      setName(productToEdit.name); // שם את השם הישן
      setPrice(productToEdit.price); // שם את המחיר הישן
      
      // אם יש למוצר תמונה בשרת, נציג אותה בתור התצוגה המקדימה ההתחלתית
      if (productToEdit.image) {
        setPreview(`http://localhost:5000/${productToEdit.image}`);
      }
    }
  }, [isEdit, productToEdit]); // מופעל רק כשהמשתנים האלו משתנים

  // *** חדש! פונקציה שמטפלת בבחירת תמונה חדשה ***
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // לוקחים את הקובץ שהמשתמש בחר
    if (file) {
      setImage(file); // שומרים את הקובץ המקורי בשביל לשלוח לשרת
      // יוצרים "קישור זמני" מקומי בדפדפן כדי להציג את התמונה מיד
      setPreview(URL.createObjectURL(file)); 
    }
  };

  // 6. הפונקציה שמופעלת כשלוחצים על "שמור"
  const handleSubmit = async (e) => {
    e.preventDefault(); // עוצר את רענון העמוד האוטומטי של הדפדפן

    // יצירת אובייקט מיוחד (FormData) שיודע להכיל גם תמונות וגם טקסט
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    
    // נוסיף תמונה ל"חבילה" רק אם המשתמש בחר תמונה חדשה
    if (image) {
      formData.append('image', image);
    }

    // בדיקה: האם אנחנו עורכים או מוסיפים חדש?
    if (isEdit) {
      // אם אנחנו בעריכה - נשלח בקשת עדכון עם ה-ID הספציפי
      dispatch(updateProductAsync({ id, formData, token }));
    } else {
      // אם אנחנו בהוספה - נשלח בקשה ליצירת מוצר חדש
      dispatch(addProductAsync({ formData, token }));
    }
    
    // 7. בסיום הפעולה, חוזרים אוטומטית לדף הבית (לרשימת המפות)
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
        
        {/* כותרת דינמית שמשתנה לפי המצב (עריכה או הוספה) */}
        <Typography variant="h4" align="center" gutterBottom>
          {isEdit ? 'עריכת מפה ✏️' : 'הוספת מפה חדשה 🏠'}
        </Typography>

        {/* הטופס עצמו */}
        <form onSubmit={handleSubmit}>
          
          {/* שדה הקלדה לשם המוצר */}
          <TextField 
            fullWidth 
            label="שם המוצר" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            margin="normal" 
            required 
          />
          
          {/* שדה הקלדה למחיר (מספרים בלבד) */}
          <TextField 
            fullWidth 
            label="מחיר" 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            margin="normal" 
            required 
          />

          {/* אזור העלאת התמונה */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              {isEdit ? 'החלפת תמונה (אופציונלי):' : 'בחירת תמונה:'}
            </Typography>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} // החלפנו לפונקציה החדשה שלנו שיודעת לעשות תצוגה מקדימה!
              required={!isEdit} // חובה להעלות תמונה רק בהוספה, בעריכה זה רשות
            />
          </Box>

          {/* *** חדש! הצגת התצוגה המקדימה של התמונה *** */}
          {preview && (
            <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
              <img 
                src={preview} 
                alt="תצוגה מקדימה" 
                style={{ 
                  maxWidth: '100%', // שלא יחרוג מרוחב הטופס
                  height: '200px', // גובה אחיד
                  objectFit: 'cover', // חותך יפה אם הפרופורציות שונות
                  borderRadius: '10px', // פינות מעוגלות
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // צל עדין
                }} 
              />
            </Box>
          )}

          {/* כפתור השמירה שמשנה את הטקסט שלו בהתאם למצב */}
          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            sx={{ mt: 3, bgcolor: '#b18e6a', '&:hover': { bgcolor: '#8d6e63' } }}
          >
            {isEdit ? 'שמור שינויים' : 'הוסף מוצר'}
          </Button>
          
        </form>
      </Box>
    </Container>
  );
}