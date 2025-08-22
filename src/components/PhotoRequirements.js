import React from 'react';

const PhotoRequirements = ({ onAgree, onBack }) => {
  return (
    <div className="requirements-page">
      <div className="requirements-container">
        <h1>📸 Photo Requirements</h1>
        <p className="subtitle">Before we analyze your photo, please ensure it meets these requirements</p>

        <div className="requirements-grid">
          <div className="requirement-card">
            <div className="icon">💡</div>
            <h3>Good Lighting</h3>
            <p>Ensure your face is well-lit with natural or soft artificial light. Avoid harsh shadows.</p>
          </div>

          <div className="requirement-card">
            <div className="icon">👤</div>
            <h3>Face Forward</h3>
            <p>Look directly at the camera with your face centered in the frame. No profile shots.</p>
          </div>

          <div className="requirement-card">
            <div className="icon">🎯</div>
            <h3>Clear View</h3>
            <p>Make sure your entire face is visible from forehead to chin. No obstructions.</p>
          </div>

          <div className="requirement-card">
            <div className="icon">😊</div>
            <h3>Neutral Expression</h3>
            <p>Keep a relaxed, neutral expression. Avoid smiling or frowning for best results.</p>
          </div>

          <div className="requirement-card">
            <div className="icon">🕶️</div>
            <h3>No Accessories</h3>
            <p>Remove glasses, hats, or anything that might obscure your facial features.</p>
          </div>

          <div className="requirement-card">
            <div className="icon">🌅</div>
            <h3>Good Quality</h3>
            <p>Use a clear, high-resolution image. Blurry or pixelated photos won't work well.</p>
          </div>
        </div>

        <div className="requirements-footer">
          <button onClick={onBack} className="btn btn-secondary">
            Back
          </button>
          <button onClick={onAgree} className="btn btn-primary">
            I Understand - Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoRequirements;
