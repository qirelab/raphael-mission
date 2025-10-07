import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '@styles/index.css';
import '@styles/donation-tailwind.css';
import { LanguageProvider } from './context/LanguageContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM?.createRoot(document.getElementById('root'))?.render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
