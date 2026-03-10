// ייבוא הפונקציות הבסיסיות של ריאקט (ו-useState לניהול מצב של שגיאות)
import React, { useState } from 'react';
// ייבוא הפונקציה useForm מ-react-hook-form לניהול חכם של הטופס והולידציות
import { useForm } from 'react-hook-form';
// ייבוא רכיבי עיצוב מוכנים מתוך ספריית MUI (תיבות טקסט, כפתורים וטקסטים)
import { TextField, Button, Box, Typography } from '@mui/material';
// ייבוא פונקציית הניווט של ריאקט כדי שנוכל להעביר את המשתמש לעמוד אחר אחרי ההתחברות
import { useNavigate } from 'react-router-dom';
// ייבוא פונקציית ההתחברות שיצרנו בקובץ הסרביס (זו ששולחת את הנתונים לשרת)
import { loginUser } from '../../services/auth.service';

// הקומפוננטה הראשית של עמוד ההתחברות
export default function Login() {
  // פירוק הפונקציות מתוך useForm כדי לחבר את השדות ולבדוק שגיאות
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // הפעלת פונקציית הניווט ושמירתה במשתנה navigate
  const navigate = useNavigate();
  
  // יצירת משתנה סטייט (state) שישמור הודעת שגיאה כללית (למשל "סיסמה שגויה") כדי שנציג אותה למשתמש
  const [serverError, setServerError] = useState('');

  // הפונקציה האסינכרונית שתופעל כשנלחץ על "התחבר" והטופס תקין
  const onSubmit = async (data) => {
    // איפוס השגיאה הכללית לפני תחילת השליחה החדשה
    setServerError('');
    
    // ניסיון לשלוח את הנתונים לשרת
    try {
      // קריאה לפונקציית הסרביס שלנו עם הנתונים מהטופס (אימייל וסיסמה)
      const response = await loginUser(data);
      
      // הדפסת התשובה לקונסול כדי שנוודא שהטוקן אכן הגיע
      console.log("התחברות הצליחה! תשובת השרת:", response);
      
      // העברת המשתמש בחזרה לדף הבית (רשימת המוצרים) אחרי שההתחברות עברה בהצלחה
      navigate('/');
      
    // במידה והשרת החזיר שגיאה (ה-catch של הסרביס נזרק לכאן)
    } catch (error) {
      // עדכון הסטייט של השגיאה כדי שיציג הודעה אדומה בטופס
      setServerError('אימייל או סיסמה שגויים. נסה שוב.');
    }
  };

  // רינדור הממשק (כאן תיקנתי את ההערות כדי שלא יופיעו באתר!)
  return (
    <Box sx={{ maxWidth: 400, margin: '50px auto', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '10px', backgroundColor: '#fff', textAlign: 'center' }}>
      
      {/* הכותרת של הטופס */}
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#b18e6a', fontWeight: 'bold' }}>
        התחברות לחשבון
      </Typography>

      {/* הצגת הודעת שגיאה אדומה במקרה שהשרת דחה את ההתחברות */}
      {serverError && (
        <Typography color="error" sx={{ marginBottom: '15px' }}>
          {serverError}
        </Typography>
      )}

      {/* הטופס עצמו, עם הפעלת הבדיקות בעת השליחה */}
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* שדה הקלט של האימייל עם הגדרות חובה */}
        <TextField 
          fullWidth label="כתובת אימייל" variant="outlined" margin="normal"
          {...register("email", { required: "חובה להזין אימייל" })}
          error={!!errors.email} helperText={errors.email ? errors.email.message : ""}
        />

        {/* שדה הקלט של הסיסמה עם הגדרות מינימום תווים */}
        <TextField 
          fullWidth type="password" label="סיסמה" variant="outlined" margin="normal"
          {...register("password", { required: "חובה להזין סיסמה", minLength: { value: 6, message: "מינימום 6 תווים" } })}
          error={!!errors.password} helperText={errors.password ? errors.password.message : ""}
        />

        {/* כפתור השליחה של הטופס */}
        <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px', backgroundColor: '#b18e6a', padding: '10px', fontSize: '1.1rem' }}>
          התחבר
        </Button>
      </form>
    </Box>
  );
}