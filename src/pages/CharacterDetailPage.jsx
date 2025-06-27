import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { formatCharacterStatus } from '../utils/formatters';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, _setCharacter] = useState(null);
  const [loading, _setLoading] = useState(true);
  const [error, _setError] = useState(null);

  // Component logic will be implemented here
  useEffect(() => {
    // Fetch individual character logic will be added here
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRetry = () => {
    // Retry logic will be implemented here
  };

  if (loading) {
    return <Loader message="Loading character details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (!character) {
    return <ErrorMessage message="Character not found" />;
  }

  const statusInfo = formatCharacterStatus(character.status);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            className="mb-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            onClick={handleBackClick}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Characters
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{character.name}</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={character.image} 
                alt={character.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            
            <div className="md:w-1/2 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-2 font-bold ${
                      statusInfo.className === 'status-alive' ? 'text-green-600' :
                      statusInfo.className === 'status-dead' ? 'text-red-600' :
                      'text-gray-500'
                    }`}>
                      {statusInfo.text}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Species:</span> 
                    <span className="ml-2">{character.species}</span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Gender:</span> 
                    <span className="ml-2">{character.gender}</span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Origin:</span> 
                    <span className="ml-2">{character.origin?.name || 'Unknown'}</span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> 
                    <span className="ml-2">{character.location?.name || 'Unknown'}</span>
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Episodes</h2>
                <p className="text-gray-700">
                  Appears in <span className="font-medium text-blue-600">{character.episode?.length || 0}</span> episodes
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterDetailPage; 