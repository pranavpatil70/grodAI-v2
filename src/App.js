import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './config/contexts/AuthContext.js';
import HeroSection from './components/HeroSection';
import TextToSpeech from './pages/TextToSpeech';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
