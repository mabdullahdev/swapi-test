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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Loader message="Loading character details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <ErrorMessage message="Character not found" onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center mx-auto">
          <button 
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mb-4"
            onClick={handleBackClick}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Characters
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{character.name}</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center lg:justify-items-stretch">
          {/* Character Image and Basic Info */}
          <div className="lg:col-span-1 w-full max-w-md lg:max-w-none">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-28">
              <div className="aspect-square">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{character.name}</h2>
                
                {/* Status Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(character.status)}`}>
                    <span className={`w-2.5 h-2.5 rounded-full mr-2 ${getStatusDotColor(character.status)}`}></span>
                    {character.status}
                  </span>
                </div>
                
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Species</span>
                    <p className="text-lg font-medium text-gray-900 mt-1">{character.species}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Gender</span>
                    <p className="text-lg font-medium text-gray-900 mt-1">{character.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-8 w-full">
            {/* Origin and Location */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Origin & Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 text-center">
                  <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">Origin</h3>
                  <p className="text-xl font-bold text-gray-900">{character.origin?.name || 'Unknown'}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 text-center">
                  <h3 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">Last Known Location</h3>
                  <p className="text-xl font-bold text-gray-900 mb-3">{character.location?.name || 'Unknown'}</p>
                  {location && (
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-semibold">Type:</span> {location.type}</p>
                      <p><span className="font-semibold">Dimension:</span> {location.dimension}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Episodes */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Episodes <span className="text-lg font-normal text-gray-500">({episodes.length})</span>
              </h2>
              
              {episodes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {episodes.map((episode) => (
                    <div 
                      key={episode.id} 
                      className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-900 text-base leading-tight pr-2">{episode.name}</h3>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full whitespace-nowrap">
                          {episode.episode}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">
                        📅 {episode.air_date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <div className="text-gray-400 text-6xl mb-4">📺</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Episodes Available</h3>
                  <p className="text-gray-600">Episode information is not available for this character</p>
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