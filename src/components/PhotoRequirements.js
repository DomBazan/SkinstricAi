import React, { useState } from 'react';
import ProceedButton from '../svg/button-icon-text-shrunk (4).svg';
import BackIcon from '../svg/button-icon-text-shrunk (3).svg';
import { ReactComponent as Header } from '../svg/header.svg';
import { ReactComponent as Rombuses } from '../svg/rombuses.svg';
import { ReactComponent as Rectangle } from '../svg/Rectangle 2779.svg';
import { useNavigate } from 'react-router-dom';

const PhotoRequirements = ({ onAgree, onBack }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsConfirmed(!isConfirmed);
  };

  const handleContinue = () => {
    if (isConfirmed) {
      if (onAgree) {
        onAgree();
      } else {
        navigate('/start-analysis');
      }
    }
  };

  const handleBack = () => {
    navigate('/intro-location');
  };

  return (
    <div className="name-location-form diamond-page">
      <Header style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
      <div className="rombuses-wrapper" style={{ position: 'relative' }}>
        <Rombuses className="rombuses-svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
        <Rectangle style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, opacity: 0.1 }} />
        <div className="requirements-container" style={{ marginTop: '40px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '60px', lineHeight: '64px', letterSpacing: '-7%', textAlign: 'center', marginBottom: '20px' }}>📸 Photo Requirements</h1>
          <p className="subtitle" style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', textAlign: 'center', marginBottom: '40px' }}>Before we analyze your photo, please ensure it meets these requirements</p>

          <div className="requirements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div className="requirement-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
              <div className="icon" style={{ fontSize: '40px', marginBottom: '10px' }}>💡</div>
              <h3 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', marginBottom: '10px' }}>Good Lighting</h3>
              <p style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '20px', letterSpacing: '0%' }}>Ensure your face is well-lit with natural or soft artificial light. Avoid harsh shadows.</p>
            </div>

            <div className="requirement-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
              <div className="icon" style={{ fontSize: '40px', marginBottom: '10px' }}>👤</div>
              <h3 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', marginBottom: '10px' }}>Face Forward</h3>
              <p style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '20px', letterSpacing: '0%' }}>Look directly at the camera with your face centered in the frame. No profile shots.</p>
            </div>

            <div className="requirement-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
              <div className="icon" style={{ fontSize: '40px', marginBottom: '10px' }}>🎯</div>
              <h3 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', marginBottom: '10px' }}>Clear View</h3>
              <p style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '20px', letterSpacing: '0%' }}>Make sure your entire face is visible from forehead to chin. No obstructions.</p>
            </div>

            <div className="requirement-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
              <div className="icon" style={{ fontSize: '40px', marginBottom: '10px' }}>😊</div>
              <h3 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', marginBottom: '10px' }}>Neutral Expression</h3>
              <p style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '20px', letterSpacing: '0%' }}>Keep a relaxed, neutral expression. Avoid smiling or frowning for best results.</p>
            </div>

            <div className="requirement-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
              <div className="icon" style={{ fontSize: '40px', marginBottom: '10px' }}>🕶️</div>
              <h3 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', marginBottom: '10px' }}>No Accessories</h3>
              <p style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '20px', letterSpacing: '0%' }}>Remove glasses, hats, or anything that might obscure your facial features.</p>
            </div>

            <div className="requirement-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '10px', textAlign: 'center' }}>
              <div className="icon" style={{ fontSize: '40px', marginBottom: '10px' }}>🌅</div>
              <h3 style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '24px', lineHeight: '28px', letterSpacing: '-2%', marginBottom: '10px' }}>Good Quality</h3>
              <p style={{ fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '16px', lineHeight: '20px', letterSpacing: '0%' }}>Use a clear, high-resolution image. Blurry or pixelated photos won't work well.</p>
            </div>
          </div>

          <div className="confirmation-checkbox" style={{ marginBottom: '40px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '22px', letterSpacing: '0%' }}>
              <input
                type="checkbox"
                checked={isConfirmed}
                onChange={handleCheckboxChange}
                className="checkbox-input"
                style={{ marginRight: '10px' }}
              />
              I confirm that I understand all the photo requirements
            </label>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={handleBack} className="back-button" aria-label="Back" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src={BackIcon} alt="Back" />
        </button>
        <button
          onClick={handleContinue}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', bottom: '20px', right: '20px' }}
          aria-label="Continue"
          disabled={!isConfirmed}
        >
          <img src={ProceedButton} alt="Continue" />
        </button>
      </div>
    </div>
  );
};

export default PhotoRequirements;
