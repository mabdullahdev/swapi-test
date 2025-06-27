import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatCharacterStatus } from '../utils/formatters';

const CharacterCard = ({ character }) => {
  const statusInfo = formatCharacterStatus(character.status);
  
  return (
    <Link 
      to={`/character/${character.id}`}
      className="block w-full bg-white border border-gray-200 rounded-2xl p-6 m-2 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300 cursor-pointer group"
    >
      <div className="relative mb-6">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-56 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
            statusInfo.className === 'status-alive' ? 'bg-green-100 text-green-800 border border-green-200' :
            statusInfo.className === 'status-dead' ? 'bg-red-100 text-red-800 border border-red-200' :
            'bg-gray-100 text-gray-800 border border-gray-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              statusInfo.className === 'status-alive' ? 'bg-green-500' :
              statusInfo.className === 'status-dead' ? 'bg-red-500' :
              'bg-gray-500'
            }`}></span>
            {statusInfo.text}
          </span>
        </div>
      </div>
      
      <div className="space-y-4 px-2">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 text-center">
          {character.name}
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-500">Species:</span>
            <span className="text-gray-900 font-semibold">{character.species}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-500">Location:</span>
            <span className="text-gray-900 font-semibold truncate ml-2 text-right">{character.location?.name || 'Unknown'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.object.isRequired
};

export default CharacterCard; 