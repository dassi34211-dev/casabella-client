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
  // שליפת פרטי המשתמש הנוכחי מתוך הרידאקס (אם אין משתמש, זה יהיה null)
  const user = useSelector((state) => state.auth.user);
  
  // הכנת פונקציות ה-dispatch (לרידאקס) וה-navigate (לניווט)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // פונקציה שמופעלת כשהמשתמש לוחץ על כפתור "התנתקות"
  const handleLogout = () => {
    // מפעילים את הפעולה שמוחקת את הטוקן מהרידאקס ומה-localStorage
    dispatch(setLogout());
    // מעבירים את המשתמש חזרה לדף הבית
    navigate('/');
  };

  return (
    // יצירת פס הניווט העליון וצביעתו בצבע חום-זהב
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* כפתור "דף הבית" שמופיע תמיד */}
          <Button color="inherit" component={Link} to="/">דף הבית</Button>
          
          {/* תנאי: אם המשתמש מחובר (user קיים) */}
          {user ? (
            <>
              {/* מציגים טקסט ברכה. בודקים גם אם הוא מנהל (isAdmin) ומציגים בהתאם */}
              <Typography sx={{ margin: '0 15px', fontWeight: 'bold' }}>
                שלום, {user.isAdmin ? 'מנהל' : 'לקוח'}!
              </Typography>
              
              {/* כפתור ההתנתקות שמפעיל את הפונקציה handleLogout */}
              <Button color="inherit" onClick={handleLogout} sx={{ border: '1px solid white' }}>
                התנתקות
              </Button>
            </>
          ) : (
            // תנאי: אם המשתמש *לא* מחובר (user הוא null)
            // מציגים רק את כפתור ההתחברות שמפנה לעמוד ה-login
            <Button color="inherit" component={Link} to="/login" sx={{ border: '1px solid white' }}>
              התחברות
            </Button>
          )}
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}