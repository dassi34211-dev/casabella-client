import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAsync } from './productSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function AddProduct() {
  // הגדרת מצב (State) לנתוני הטופס
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // שליפת הטוקן כדי להוכיח לשרת שאנחנו המנהלת (dassi34211@gmail.com)
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = (e) => {
    e.preventDefault();

    // יצירת אובייקט FormData - חובה כשמעלים קבצים (Images) לשרת
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image); // הקובץ עצמו

    // שיגור הפעולה לרידאקס
    dispatch(addProductAsync({ formData, token }));
    
    // חזרה לדף המוצרים כדי לראות את המפה החדשה
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#b18e6a', fontWeight: 'bold' }}>
          הוספת מפה חדשה 🏠
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="שם המפה"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="מחיר (₪)"
            type="number"
            variant="outlined"
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          
          {/* כפתור בחירת תמונה */}
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2, backgroundColor: '#f5f5f5', color: '#333', '&:hover': { backgroundColor: '#e0e0e0' } }}
          >
            {image ? `נבחר קובץ: ${image.name}` : 'בחר תמונת מפה'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Button>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#b18e6a', py: 1.5, fontWeight: 'bold' }}
          >
            שמור מוצר
          </Button>
        </form>
      </Paper>
    </Box>
  );
}