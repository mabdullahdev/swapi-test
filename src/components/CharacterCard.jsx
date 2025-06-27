import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatCharacterStatus } from '../utils/formatters';

const CharacterCard = ({ character }) => {
  const statusInfo = formatCharacterStatus(character.status);
  
  return (
    <Link 
      to={`/character/${character.id}`}
      className="block bg-white border border-gray-200 rounded-lg p-4 m-2 shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-blue-500 transition-all duration-300 cursor-pointer"
    >
      <img 
        src={character.image} 
        alt={character.name}
        className="w-full h-48 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{character.name}</h3>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Status:</span> 
        <span className={`ml-1 font-bold ${
          statusInfo.className === 'status-alive' ? 'text-green-600' :
          statusInfo.className === 'status-dead' ? 'text-red-600' :
          'text-gray-500'
        }`}>
          {statusInfo.text}
        </span>
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Species:</span> {character.species}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Location:</span> {character.location?.name || 'Unknown'}
      </p>
    </Link>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.object.isRequired
};

export default CharacterCard; 