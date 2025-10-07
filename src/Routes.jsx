import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import page components
import HomePage from './pages/Home';
import AboutMission from './pages/AboutMission';
import ProjectsPage from './pages/Projects';
import DonationPage from './pages/Donation';
import TestimoniesPage from './pages/Testimonies';
import ShopPage from './pages/Shop';
import TrainingPrograms from './pages/Training';
import QuestionsContact from './pages/QuestionsContact';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/donation" element={<DonationPage />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/testimonies" element={<TestimoniesPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/training" element={<TrainingPrograms />} />
        <Route path="/about" element={<AboutMission />} />
        <Route path="/contact" element={<QuestionsContact />} />
        <Route path="/about-mission" element={<AboutMission />} />
        <Route path="/questions-contact" element={<QuestionsContact />} />
      </Routes>
  );
};

export default AppRoutes;
