import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProceedButton from '../svg/button-icon-text-shrunk (4).svg';
import BackIcon from '../svg/button-icon-text-shrunk (3).svg';
import { ReactComponent as Header } from '../svg/header.svg';
import { ReactComponent as Rombuses } from '../svg/rombuses.svg';
import { ReactComponent as Rectangle } from '../svg/Rectangle 2779.svg';

const IntroName = ({ onNext }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // After user enters name, go to next step
    if (onNext) onNext();
  };

  return (
    <div className="name-location-form diamond-page">
      {/* Header */}
      <Header style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />

      {/* Background SVGs */}
      <div className="rombuses-wrapper" style={{ position: 'relative' }}>
        <Rombuses
          className="rombuses-svg"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        />
        <Rectangle
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            opacity: 0.1,
          }}
        />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="form-container"
          style={{ marginTop: '40px', position: 'relative', zIndex: 2 }}
        >
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Introduce yourself"
            className="location-input"
            maxLength={100}
            autoFocus
            required
            style={{
              width: '100%',
              fontFamily: 'Roobert TRIAL',
              fontWeight: 400,
              fontSize: '60px',
              lineHeight: '64px',
              letterSpacing: '-0.07em',
              textAlign: 'center',
            }}
          />
        </form>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          position: 'relative',
        }}
      >
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="back-button"
          aria-label="Back"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <img src={BackIcon} alt="Back" />
        </button>

        {/* Proceed */}
        <button
          type="submit"
          onClick={handleSubmit}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            position: 'absolute',
            bottom: '20px',
            right: '20px',
          }}
          aria-label="Proceed"
        >
          <img src={ProceedButton} alt="Proceed" />
        </button>
      </div>
    </div>
  );
};

export default IntroName;

