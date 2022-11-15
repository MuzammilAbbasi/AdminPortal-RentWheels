import React from 'react';

const LoadingOverlay = ( props ) => {

  return (
    <div
      className="overlay-container"
      {...props}
    >
      <div className='loading'></div>      
    </div>
  );
}

export default LoadingOverlay;