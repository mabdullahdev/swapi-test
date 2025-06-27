import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-base m-0">{message}</p>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string
};

export default Loader; 