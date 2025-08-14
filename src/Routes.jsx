import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';
import ProjectsPage from './pages/Projects';
import DonationPage from './pages/Donation';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/donation" element={<DonationPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
