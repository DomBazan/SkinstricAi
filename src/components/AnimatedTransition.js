import React, { useState, useEffect } from 'react';
import './AnimatedTransition.css';

const AnimatedTransition = ({ isVisible, children, type = 'fade' }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) setShouldRender(true);
  }, [isVisible]);

  const handleAnimationEnd = () => {
    if (!isVisible) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`transition-container ${type} ${isVisible ? 'enter' : 'exit'}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
