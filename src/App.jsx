import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Routes from './Routes';
import CookieConsent from './components/CookieConsent';
import PageLoader from './components/common/PageLoader';
import ChatBot from './components/ChatBot';
import { ContactProvider } from './context/ContactContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { AlertProvider } from './context/AlertContext';
import { ChatProvider } from './context/ChatContext';
import { useScrollToTop } from './hooks/useScrollToTop';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { isLoading } = useLoading();

  // Enable scroll to top on route changes (except admin routes and hash navigation)
  useScrollToTop();

  return (
    <>
      {isLoading && <PageLoader />}
      {!isAdminRoute && <Header />}
      <Routes />
      {!isAdminRoute && <CookieConsent />}
      {!isAdminRoute && <ChatBot />}
    </>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <ContactProvider>
        <AlertProvider>
          <ChatProvider>
            <AppContent />
          </ChatProvider>
        </AlertProvider>
      </ContactProvider>
    </LoadingProvider>
  );
}
