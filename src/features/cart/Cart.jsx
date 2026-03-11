import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from './cartSlice';
import { Box, Typography, Container, Paper, IconButton, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h5">העגלה שלך ריקה...</Typography>
        <Button component={Link} to="/" sx={{ mt: 3, color: '#b18e6a' }}>חזרה לקניות</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1a3761', textAlign: 'center' }}>עגלת הקניות שלי</Typography>
      
      <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid #f0f0f0' }}>
        {items.map((item) => (
          <Box key={item._id} sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
            <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }} />
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">{item.price} ₪</Typography>
            </Box>

            {/* שליטה בכמויות - רק כאן! */}
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: '10px' }}>
              <IconButton size="small" onClick={() => dispatch(removeFromCart(item._id))}><RemoveIcon fontSize="small" /></IconButton>
              <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => dispatch(addToCart(item))}><AddIcon fontSize="small" /></IconButton>
            </Box>

            <Typography sx={{ fontWeight: 'bold', minWidth: '80px', textAlign: 'left' }}>
               {item.price * item.quantity} ₪
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">סה"כ לתשלום:</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#b18e6a' }}>{totalAmount} ₪</Typography>
        </Box>

        <Button fullWidth variant="contained" sx={{ mt: 4, bgcolor: '#5d4037', py: 1.5, borderRadius: '12px', fontSize: '1.1rem' }}>
          המשך לתשלום
        </Button>
      </Paper>
    </Container>
  );
}