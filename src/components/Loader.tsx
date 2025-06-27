import React from 'react';
import { LoaderProps } from '../types/components';

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
        {message}
      </p>
    </div>
  );
};

export default Loader;
