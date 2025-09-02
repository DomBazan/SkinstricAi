import React, { useState } from 'react';
import ProceedButton from '../svg/button-icon-text-shrunk (4).svg';
import BackIcon from '../svg/button-icon-text-shrunk (3).svg';
import { ReactComponent as Header } from '../svg/header.svg';
import { ReactComponent as Rombuses } from '../svg/rombuses.svg';
import { ReactComponent as Rectangle } from '../svg/Rectangle 2779.svg';

import { useNavigate } from 'react-router-dom';

const IntroLocation = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the next page, e.g., "Photo Requirements" page
    navigate('/start-analysis');
  };

  return (
    <div className="name-location-form diamond-page">
      <Header style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
      <div className="rombuses-wrapper" style={{ position: 'relative' }}>
        <Rombuses className="rombuses-svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
        <Rectangle style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, opacity: 0.1 }} />
        <form onSubmit={handleSubmit} className="form-container" style={{ marginTop: '40px', position: 'relative', zIndex: 2 }}>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="Where are you from?"
            className={`location-input`}
            maxLength={100}
            autoFocus
            required
            style={{ width: '100%', fontFamily: 'Roobert TRIAL', fontWeight: 400, fontStyle: 'normal', fontSize: '60px', lineHeight: '64px', letterSpacing: '-7%', textAlign: 'center' }}
          />
        </form>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={() => navigate('/')} className="back-button" aria-label="Back" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
          <img src={BackIcon} alt="Back" />
        </button>
        <button
          type="button"
          onClick={() => navigate('/start-analysis')}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', position: 'absolute', bottom: '20px', right: '20px' }}
          aria-label="Proceed"
        >
          <img src={ProceedButton} alt="Proceed" />
        </button>
      </div>
    </div>
  );
};

export default IntroLocation;

