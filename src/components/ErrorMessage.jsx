import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-gray-50 border border-gray-200 rounded-lg m-5">
      <div className="text-5xl mb-4">⚠️</div>
      <h3 className="text-red-600 text-xl font-semibold mb-4 m-0">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-5 max-w-md m-0">{message || 'An unexpected error occurred'}</p>
      {onRetry && (
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded cursor-pointer text-base transition-colors duration-300"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func
};

export default ErrorMessage; 