import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-item" style={{ height: '20px', width: '80%' }}></div>
      <div className="skeleton-item" style={{ height: '20px', width: '60%' }}></div>
      <div className="skeleton-item" style={{ height: '20px', width: '90%' }}></div>
      <div className="skeleton-item" style={{ height: '20px', width: '70%' }}></div>
    </div>
  );
};

export default SkeletonLoader;
