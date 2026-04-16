import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import { store } from './store';       // Import store yang sudah kita buat
import App from './App';
import './index.css';                  // Pastikan Tailwind v4 di-import di sini

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Bungkus App dengan Provider dan masukkan store sebagai props */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);