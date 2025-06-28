import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Fetching weather data...</p>
    </div>
  );
};

export default LoadingSpinner; 