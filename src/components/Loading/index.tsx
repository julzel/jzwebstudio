import * as React from 'react';

// local imports
import './Loading.css';

interface LoadingProps {
  isLoading: boolean;
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  message = 'Loading...',
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-container">
      <p>{message}</p>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
