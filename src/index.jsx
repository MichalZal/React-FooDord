import {StrictMode}from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CartProvider from './store/CartProvider'

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
