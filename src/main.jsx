import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ייבוא של Redux
import { Provider } from 'react-redux';
import { store } from './app/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* עוטפים את האפליקציה כדי שלכולם תהיה גישה ל-Redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);