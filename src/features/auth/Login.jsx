// ייבוא הפונקציות מספרית ריאקט
import React from 'react';
// ייבוא הפונקציה useForm מהספרייה שמנהלת לנו את הטפסים בצורה חכמה (דרישת חובה במסמך)
import { useForm } from 'react-hook-form';
// ייבוא רכיבי עיצוב מוכנים מתוך ספריית MUI כדי שהטופס ייראה מקצועי
import { TextField, Button, Box, Typography } from '@mui/material';

// הגדרת הקומפוננטה הראשית של עמוד ההתחברות
export default function Login() {
  
  // פירוק (Destructuring) של הפונקציות שאנחנו צריכים מתוך useForm
  // register - מחבר את שדות הקלט (Inputs) לניהול של הספרייה
  // handleSubmit - פונקציה שעוטפת את פעולת השליחה ומפעילה את הבדיקות שלנו
  // formState: { errors } - אובייקט שמכיל את כל השגיאות (למשל אם חסר אימייל)
  const { register, handleSubmit, formState: { errors } } = useForm();

  // הפונקציה שתופעל ברגע שהמשתמש ילחץ על כפתור "התחבר" והכל יהיה תקין
  // כרגע היא רק מדפיסה לקונסול את המידע, בהמשך נשלח את זה לשרת (Node.js)
  const onSubmit = (data) => {
    console.log("נתוני הטופס שנשלחו:", data);
  };

  // תחילת רינדור (הצגת) הממשק של הקומפוננטה
  return (
    // Box של MUI מתפקד כמו <div> אבל עם המון אפשרויות עיצוב קלות
    // עיצבנו אותו להיות באמצע המסך, עם רוחב מקסימלי, צללית ופינות מעוגלות
    <Box 
      sx={{ 
        maxWidth: 400, 
        margin: '50px auto', 
        padding: '30px', 
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
        borderRadius: '10px',
        backgroundColor: '#fff',
        textAlign: 'center'
      }}
    >
      {/* Typography של MUI משמש לטקסטים וכותרות. כאן זו הכותרת הראשית (h4) */}
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#b18e6a', fontWeight: 'bold' }}>
        התחברות לחשבון
      </Typography>

      {/* תגית form רגילה של HTML שעוטפת את השדות */}
      {/* באירוע onSubmit אנחנו מפעילים את ה-handleSubmit של הספרייה, והוא מפעיל את ה-onSubmit שלנו */}
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* TextField הוא שדה קלט של MUI. הוא מקבל עיצוב מלא אוטומטית */}
        <TextField 
          fullWidth // גורם לשדה לתפוס את כל הרוחב
          label="כתובת אימייל" // הטקסט שמופיע בתוך השדה
          variant="outlined" // סגנון העיצוב (מסגרת)
          margin="normal" // מוסיף רווח תקני מלמעלה ולמטה
          // כאן אנחנו מחברים את השדה לספריית הטפסים ומגדירים שהוא שדה חובה!
          {...register("email", { required: "חובה להזין אימייל" })}
          // אם יש שגיאה בשדה הזה (למשל הושאר ריק), error יהיה true והשדה יהפוך לאדום
          error={!!errors.email}
          // הטקסט האדום שיופיע מתחת לשדה במקרה של שגיאה
          helperText={errors.email ? errors.email.message : ""}
        />

        {/* שדה קלט עבור הסיסמה */}
        <TextField 
          fullWidth
          type="password" // מסתיר את התווים שהמשתמש מקליד (נקודות שחורות)
          label="סיסמה"
          variant="outlined"
          margin="normal"
          // מחברים את השדה ומגדירים שחובה להזין, ומינימום 6 תווים
          {...register("password", { 
            required: "חובה להזין סיסמה",
            minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" }
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
        />

        {/* Button של MUI המשמש ככפתור שליחת הטופס */}
        <Button 
          type="submit" // מגדיר שלחיצה על הכפתור תשגר את הטופס
          fullWidth 
          variant="contained" // כפתור מלא בצבע
          // עיצוב צבע הכפתור לזהב-חום של האתר
          sx={{ marginTop: '20px', backgroundColor: '#b18e6a', padding: '10px', fontSize: '1.1rem' }}
        >
          התחבר
        </Button>
      </form>
    </Box>
  );
}