import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// ייבוא פונקציית useDispatch כדי שנוכל לדבר עם רידאקס
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/auth.service';
// ייבוא פעולת ה-setLogin שיצרנו בקובץ ה-Slice
import { setLogin } from './authSlice';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  
  // יצירת משתנה ה-dispatch כדי לשלוח פקודות לרידאקס
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setServerError('');
    try {
      // קבלת התשובה מהשרת (בדרך כלל אובייקט עם הטוקן או הטוקן עצמו)
      const response = await loginUser(data);
      
      // חילוץ הטוקן מהתשובה (מוודא שזה עובד גם אם השרת מחזיר אובייקט {token: "..."} וגם אם רק מחרוזת)
      const token = response.token ? response.token : response;
      
      // שיגור הפעולה לרידאקס ושמירת הטוקן במוח המרכזי!
      dispatch(setLogin(token));
      
      // מעבר לדף הבית אחרי ההתחברות המוצלחת
      navigate('/');
      
    } catch (error) {
      setServerError('אימייל או סיסמה שגויים. נסה שוב.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '50px auto', padding: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '10px', backgroundColor: '#fff', textAlign: 'center' }}>
      
      {/* כותרת הטופס */}
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#b18e6a', fontWeight: 'bold' }}>
        התחברות לחשבון
      </Typography>

      {/* אזור להצגת שגיאות מהשרת */}
      {serverError && (
        <Typography color="error" sx={{ marginBottom: '15px' }}>
          {serverError}
        </Typography>
      )}

      {/* טופס ההתחברות */}
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* שדה אימייל */}
        <TextField 
          fullWidth label="כתובת אימייל" variant="outlined" margin="normal"
          {...register("email", { required: "חובה להזין אימייל" })}
          error={!!errors.email} helperText={errors.email ? errors.email.message : ""}
        />

        {/* שדה סיסמה */}
        <TextField 
          fullWidth type="password" label="סיסמה" variant="outlined" margin="normal"
          {...register("password", { required: "חובה להזין סיסמה", minLength: { value: 6, message: "מינימום 6 תווים" } })}
          error={!!errors.password} helperText={errors.password ? errors.password.message : ""}
        />

        {/* כפתור שליחה */}
        <Button type="submit" fullWidth variant="contained" sx={{ marginTop: '20px', backgroundColor: '#b18e6a', padding: '10px', fontSize: '1.1rem' }}>
          התחבר
        </Button>
      </form>
    </Box>
  );
}