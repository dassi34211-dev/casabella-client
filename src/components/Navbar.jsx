// ייבוא רכיבי העיצוב של MUI ליצירת הפס העליון
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
// ייבוא Link ו-useNavigate כדי לעבור בין עמודים מבלי לרענן את הדפדפן
import { Link, useNavigate } from 'react-router-dom';
// ייבוא הפונקציות של רידאקס לשליפת מידע ושיגור פעולות
import { useSelector, useDispatch } from 'react-redux';
// ייבוא פעולת ההתנתקות שיצרנו בפרוסת המשתמשים
import { setLogout } from '../features/auth/authSlice';
// ייבוא תמונת הלוגו שלנו
import logo from '../assets/logo.webp';

export default function Navbar() {
  // שליפת פרטי המשתמש הנוכחי מתוך הרידאקס
  const user = useSelector((state) => state.auth.user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // פונקציה להתנתקות
  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#b18e6a' }}>
      <Toolbar>
        
        {/* אזור הלוגו ושם החנות */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img 
            src={logo} 
            alt="CasaBella Logo" 
            style={{ height: '50px', marginLeft: '15px', borderRadius: '4px' }} 
          />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            CasaBella
          </Typography>
        </Box>
        
        {/* אזור כפתורי הניווט */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          
          <Button color="inherit" component={Link} to="/">דף הבית</Button>
          
          {user ? (
            <>
              {/* --- כפתור מיוחד שמופיע רק למנהל --- */}
              {user.isAdmin && (
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/add-product"
                  sx={{ 
                    backgroundColor: '#5d4037', 
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#4b332d' }
                  }}
                >
                  הוספת מוצר
                </Button>
              )}

              <Typography sx={{ margin: '0 10px', fontWeight: 'bold' }}>
                שלום, {user.isAdmin ? 'מנהל' : 'לקוח'}!
              </Typography>
              
              <Button color="inherit" onClick={handleLogout} sx={{ border: '1px solid white' }}>
                התנתקות
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login" sx={{ border: '1px solid white' }}>
              התחברות
            </Button>
          )}
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}