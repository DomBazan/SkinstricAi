import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedTransition from './AnimatedTransition';
import headerSvg from '../svg/header.svg';
import buttonLeftSvg from '../svg/button-icon-text-shrunk.svg';
import buttonRightSvg from '../svg/button-icon-text-shrunk (1).svg';
import './LandingPage.css';

export default function LandingPage() {
  const [showTransition, setShowTransition] = useState(false);
  const navigate = useNavigate();

  const handleTakeTestClick = () => {
    setShowTransition(true);
  };

  const handleAnimationEnd = () => {
    if (showTransition) {
      navigate('/intro-location');
    }
  };

  return (
    <AnimatedTransition isVisible={!showTransition} type="fade">
      <div className="landing-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header
          className="landing-header"
          style={{
            background: 'white',
            zIndex: 1000,
            padding: '10px',
            textAlign: 'center',
          }}
        >
          <img src={headerSvg} alt="Skinstric Header" className="header-image" />
        </header>

        {/* Main Section */}
        <main
          className="landing-main"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            position: 'relative',
          }}
        >
          {/* Left button */}
          <button onClick={handleTakeTestClick} className="btn-left" aria-label="Discover AI">
            <img src={buttonLeftSvg} alt="Discover AI" />
          </button>

          {/* Title */}
          <h1 className="landing-title" style={{ textAlign: 'center' }}>
            Sophisticated <br /> skincare
          </h1>

          {/* Right button */}
          <button onClick={() => navigate('/introduce-yourself')} className="btn-right" aria-label="Enter Code">
            <img src={buttonRightSvg} alt="Enter Code" />
          </button>
        </main>

        {/* Footer */}
        <footer
          className="landing-footer"
          style={{
            textAlign: 'center',
            padding: '20px',
            color: '#444',
            lineHeight: 1.5,
          }}
        >
          Skinstric developed an A.I. that creates
          <br />
          a highly-personalised routine tailored to
          <br />
          what your skin needs.
        </footer>
      </div>
    </AnimatedTransition>
  );
}
