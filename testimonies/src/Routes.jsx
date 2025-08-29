import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import ProjectsPage from './pages/Projects';
import TestimoniesPage from './pages/Testimonies';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/testimonies" element={<TestimoniesPage />} />
        <Route path="/" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;