import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getCharacter, getMultipleEpisodes, getLocation } from '../services/rickService';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch character details and related data
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch character data
        const characterData = await getCharacter(id);
        setCharacter(characterData);
        
        // Extract episode IDs from URLs
        const episodeIds = characterData.episode?.map(url => {
          const match = url.match(/\/episode\/(\d+)/);
          return match ? match[1] : null;
        }).filter(Boolean) || [];
        
        // Fetch episodes if any exist
        if (episodeIds.length > 0) {
          try {
            const episodesData = await getMultipleEpisodes(episodeIds);
            setEpisodes(Array.isArray(episodesData) ? episodesData : [episodesData]);
          } catch (episodeError) {
            console.warn('Failed to fetch episodes:', episodeError);
            setEpisodes([]);
          }
        }
        
        // Fetch location data if available
        if (characterData.location?.url) {
          try {
            const locationData = await getLocation(characterData.location.url);
            setLocation(locationData);
          } catch (locationError) {
            console.warn('Failed to fetch location:', locationError);
            setLocation(null);
          }
        }
        
      } catch (err) {
        setError(err.message || 'Failed to load character details');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRetry = () => {
    setCharacter(null);
    setEpisodes([]);
    setLocation(null);
    setError(null);
    // Re-trigger useEffect by updating a dependency (in this case, the effect will run again)
    const fetchCharacterDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const characterData = await getCharacter(id);
        setCharacter(characterData);
        
        const episodeIds = characterData.episode?.map(url => {
          const match = url.match(/\/episode\/(\d+)/);
          return match ? match[1] : null;
        }).filter(Boolean) || [];
        
        if (episodeIds.length > 0) {
          try {
            const episodesData = await getMultipleEpisodes(episodeIds);
            setEpisodes(Array.isArray(episodesData) ? episodesData : [episodesData]);
          } catch (episodeError) {
            console.warn('Failed to fetch episodes:', episodeError);
            setEpisodes([]);
          }
        }
        
        if (characterData.location?.url) {
          try {
            const locationData = await getLocation(characterData.location.url);
            setLocation(locationData);
          } catch (locationError) {
            console.warn('Failed to fetch location:', locationError);
            setLocation(null);
          }
        }
        
      } catch (err) {
        setError(err.message || 'Failed to load character details');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'text-green-600 bg-green-100';
      case 'dead':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusDotColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader message="Loading character details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ErrorMessage message="Character not found" onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 mb-4"
            onClick={handleBackClick}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Characters
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{character.name}</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-24">
              <div className="aspect-square">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{character.name}</h2>
                
                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(character.status)}`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${getStatusDotColor(character.status)}`}></span>
                    {character.status}
                  </span>
                </div>
                
                {/* Basic Info */}
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Species</span>
                    <p className="text-gray-900">{character.species}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Gender</span>
                    <p className="text-gray-900">{character.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Origin and Location */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Origin & Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Origin</h3>
                  <p className="text-gray-900 font-medium">{character.origin?.name || 'Unknown'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Last Known Location</h3>
                  <p className="text-gray-900 font-medium">{character.location?.name || 'Unknown'}</p>
                  {location && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p><span className="font-medium">Type:</span> {location.type}</p>
                      <p><span className="font-medium">Dimension:</span> {location.dimension}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Episodes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Episodes ({episodes.length})
              </h2>
              
              {episodes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {episodes.map((episode) => (
                    <div 
                      key={episode.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{episode.name}</h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {episode.episode}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Air Date: {episode.air_date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">📺</div>
                  <p className="text-gray-500">No episode information available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterDetailPage; 