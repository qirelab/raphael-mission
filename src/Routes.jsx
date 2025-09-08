import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';
import ProjectsPage from './pages/Projects';
import DonationPage from './pages/Donation';
import TestimoniesPage from './pages/Testimonies';
import ShopPage from './pages/Shop';
import TrainingPrograms from './pages/Training';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/testimonies" element={<TestimoniesPage />} />
    <Route path="/shop" element={<ShopPage />} />
  <Route path="/training" element={<TrainingPrograms />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
