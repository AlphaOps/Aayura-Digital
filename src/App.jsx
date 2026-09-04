import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ProgramDetails } from './pages/ProgramDetails';
import { Programs } from './pages/Programs';
import { Apply } from './pages/Apply';
import { Register } from './pages/Register';
import { Contact } from './pages/Contact';
import { SocialProofPopup } from './components/SocialProofPopup';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/internships" element={<Navigate to="/programs" replace />} />
          <Route path="/program/:slug" element={<ProgramDetails />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <SocialProofPopup />
    </BrowserRouter>
  );
}

export default App;
