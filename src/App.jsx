import './App.css';
import logo from './assets/logo.webp'; // מייבאים את הלוגו שלנו!

function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* כאן אנחנו מציגים את התמונה */}
      <img src={logo} alt="Casa Bella Logo" style={{ width: '300px' }} />
      
      <h1>ברוכים הבאים לחנות של CasaBella! 🛋️</h1>
      <p>בקרוב יופיעו כאן כל המפות המהממות שלנו...</p>
    </div>
  );
}

export default App;