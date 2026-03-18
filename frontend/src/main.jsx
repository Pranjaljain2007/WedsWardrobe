import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CartProvider } from './components/CartContext/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider>
  </BrowserRouter>
);
