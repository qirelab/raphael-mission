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
import Story from './pages/Story';

// Import dynamic project detail page
import ProjectDetail from './pages/ProjectDetail';

// Legal Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';

// Admin Pages
import AdminLogin from './pages/Admin/Login';
import AdminLayout from './pages/Admin/Layout';
import Dashboard from './pages/Admin/Dashboard';
import Settings from './pages/Admin/Settings';
import ProjectsList from './pages/Admin/Projects/ProjectsList';
import ProjectForm from './pages/Admin/Projects/ProjectForm';
import TestimoniesList from './pages/Admin/Testimonies/TestimoniesList';
import TestimonyForm from './pages/Admin/Testimonies/TestimonyForm';
import ContactInfo from './pages/Admin/Contact/ContactInfo';
import TrainingList from './pages/Admin/Training/TrainingList';
import TrainingForm from './pages/Admin/Training/TrainingForm';
import ProductsList from './pages/Admin/Shop/ProductsList';
import ProductForm from './pages/Admin/Shop/ProductForm';

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
      <Route path="/story" element={<Story />} />

      {/* Dynamic Project Detail Route */}
      <Route path="/projects/:slug" element={<ProjectDetail />} />

      {/* Legal Routes */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/new" element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectForm />} />
        <Route path="testimonies" element={<TestimoniesList />} />
        <Route path="testimonies/new" element={<TestimonyForm />} />
        <Route path="testimonies/edit/:id" element={<TestimonyForm />} />
        <Route path="training" element={<TrainingList />} />
        <Route path="training/new" element={<TrainingForm />} />
        <Route path="training/edit/:id" element={<TrainingForm />} />
        <Route path="shop" element={<ProductsList />} />
        <Route path="shop/new" element={<ProductForm />} />
        <Route path="shop/edit/:id" element={<ProductForm />} />
        <Route path="contact" element={<ContactInfo />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
