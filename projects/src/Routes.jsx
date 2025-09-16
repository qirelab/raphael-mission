import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import ProjectsPage from './pages/Projects';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
