import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import IntroLocation from './components/IntroLocation';
import IntroName from './components/IntroName';
import PhotoRequirements from './components/PhotoRequirements';
import ImageUpload from './components/ImageUpload';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/intro-location" element={<IntroLocation />} />
          <Route path="/introduce-yourself" element={<IntroName />} />
          <Route path="/start-analysis" element={<ImageUpload />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
