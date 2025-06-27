import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CharacterCard = ({ id, name, species, status, image }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'text-green-600';
      case 'dead':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Link 
      to={`/character/${id}`}
      className="block bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform group"
    >
      <div className="overflow-hidden rounded-t-lg">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
          {name}
        </h3>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-600 flex items-center">
            <span className="font-medium mr-1">Status:</span>
            <span className={`inline-flex items-center ${getStatusColor(status)}`}>
              <span className={`w-2 h-2 rounded-full mr-1 ${
                status?.toLowerCase() === 'alive' ? 'bg-green-500' :
                status?.toLowerCase() === 'dead' ? 'bg-red-500' :
                'bg-gray-400'
              }`}></span>
              {status}
            </span>
          </p>
          
          <p className="text-sm text-gray-600">
            <span className="font-medium">Species:</span> 
            <span className="ml-1">{species}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

CharacterCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default CharacterCard; 