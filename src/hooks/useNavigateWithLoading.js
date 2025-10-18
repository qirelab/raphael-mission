import { useNavigate } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

export const useNavigateWithLoading = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const navigateWithLoading = (path, options = {}) => {
    showLoading();

    // Add a small delay for better UX and to ensure loading is visible
    setTimeout(() => {
      navigate(path, options);
      // Hide loading after route change
      setTimeout(() => {
        hideLoading();
      }, 300);
    }, 100);
  };

  return navigateWithLoading;
};