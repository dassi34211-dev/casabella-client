import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// מייבאים את הלוגו (שימי לב ל- ../ כי אנחנו יוצאים מתיקיית components ונכנסים ל-assets)
import logo from '../assets/logo.webp';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#b18e6a' }}>
      <Toolbar>
        {/* הלוגו שלנו במקום האימוג'י */}
        <img 
          src={logo} 
          alt="CasaBella Logo" 
          style={{ height: '50px', marginLeft: '15px', borderRadius: '4px' }} 
        />
        
        {/* שם החנות */}
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          CasaBella
        </Typography>
        
        {/* כפתורי הניווט */}
        <Button color="inherit" component={Link} to="/">דף הבית</Button>
        <Button color="inherit" component={Link} to="/login">התחברות</Button>
      </Toolbar>
    </AppBar>
  );
}