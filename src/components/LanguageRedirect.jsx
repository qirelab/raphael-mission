import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const LanguageRedirect = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    // Redirect to language-specific home page
    navigate(`/${language}`, { replace: true });
  }, [navigate, language]);

  return null;
};

export default LanguageRedirect;


