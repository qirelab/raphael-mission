import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Routes from './Routes';
import CookieConsent from './components/CookieConsent';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes />
      {!isAdminRoute && <CookieConsent />}
    </>
  );
}
