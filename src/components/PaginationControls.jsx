import React from 'react';
import PropTypes from 'prop-types';

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  hasNext, 
  hasPrev,
  onNext,
  onPrev 
}) => {
  return (
    <div className="flex items-center justify-center gap-4 py-5 my-5">
      <button 
        className={`py-2.5 px-5 rounded text-base font-medium transition-colors duration-300 ${
          !hasPrev 
            ? 'bg-gray-400 text-white cursor-not-allowed opacity-60' 
            : 'bg-blue-500 hover:bg-blue-700 text-white cursor-pointer'
        }`}
        onClick={onPrev}
        disabled={!hasPrev}
      >
        Previous
      </button>
      
      <span className="text-base text-gray-800 font-medium">
        Page {currentPage} of {totalPages || '?'}
      </span>
      
      <button 
        className={`py-2.5 px-5 rounded text-base font-medium transition-colors duration-300 ${
          !hasNext 
            ? 'bg-gray-400 text-white cursor-not-allowed opacity-60' 
            : 'bg-blue-500 hover:bg-blue-700 text-white cursor-pointer'
        }`}
        onClick={onNext}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
};

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
  onNext: PropTypes.func,
  onPrev: PropTypes.func
};

export default PaginationControls; 