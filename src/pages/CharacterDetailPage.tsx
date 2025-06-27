import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import ThemeToggle from '../components/ThemeToggle';
import {
  getCharacter,
  getMultipleEpisodes,
  getLocation,
} from '../services/rickService';
import { Character, Episode, Location } from '../types/api';

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State management
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch character details and related data
  useEffect(() => {
    const fetchCharacterDetails = async (): Promise<void> => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch character data
        const characterData = await getCharacter(id);
        setCharacter(characterData);

        // Extract episode IDs from URLs
        const episodeIds =
          characterData.episode
            ?.map((url) => {
              const match = url.match(/\/episode\/(\d+)/);
              return match ? match[1] : null;
            })
            .filter((id): id is string => id !== null) || [];

        // Fetch episodes if any exist
        if (episodeIds.length > 0) {
          try {
            const episodesData = await getMultipleEpisodes(episodeIds);
            setEpisodes(
              Array.isArray(episodesData) ? episodesData : [episodesData]
            );
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
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to load character details';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  const handleBackClick = (): void => {
    // Use browser back navigation to preserve the previous state
    // If there's no history, fallback to the character list
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleRetry = (): void => {
    setCharacter(null);
    setEpisodes([]);
    setLocation(null);
    setError(null);
    // Re-trigger useEffect by updating a dependency (in this case, the effect will run again)
    const fetchCharacterDetails = async (): Promise<void> => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const characterData = await getCharacter(id);
        setCharacter(characterData);

        const episodeIds =
          characterData.episode
            ?.map((url) => {
              const match = url.match(/\/episode\/(\d+)/);
              return match ? match[1] : null;
            })
            .filter((id): id is string => id !== null) || [];

        if (episodeIds.length > 0) {
          try {
            const episodesData = await getMultipleEpisodes(episodeIds);
            setEpisodes(
              Array.isArray(episodesData) ? episodesData : [episodesData]
            );
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
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to load character details';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  };

  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'text-green-600 dark:text-green-200 bg-green-100 dark:bg-green-900';
      case 'dead':
        return 'text-red-600 dark:text-red-200 bg-red-100 dark:bg-red-900';
      default:
        return 'text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getStatusDotColor = (status: string): string => {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Loader message="Loading character details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <ErrorMessage message="Character not found" onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center relative">
          {/* Theme Toggle - Positioned absolutely in top right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <ThemeToggle />
          </div>

          <button
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mb-4"
            onClick={handleBackClick}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Characters
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {character.name}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center lg:justify-items-stretch">
          {/* Character Image and Basic Info */}
          <div className="lg:col-span-1 w-full max-w-md lg:max-w-none">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden sticky top-28 border dark:border-gray-700">
              <div className="aspect-square">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {character.name}
                </h2>

                {/* Status Badge */}
                <div className="mb-6">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${getStatusColor(
                      character.status
                    )}`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full mr-2 ${getStatusDotColor(
                        character.status
                      )}`}
                    ></span>
                    {character.status}
                  </span>
                </div>

                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Species
                    </span>
                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                      {character.species}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Gender
                    </span>
                    <p className="text-lg font-medium text-gray-900 dark:text-white mt-1">
                      {character.gender}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-8 w-full">
            {/* Origin and Location */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Origin & Location
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-xl p-6 border border-blue-100 dark:border-blue-800 text-center">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3">
                    Origin
                  </h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {character.origin?.name || 'Unknown'}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-xl p-6 border border-green-100 dark:border-green-800 text-center">
                  <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-3">
                    Last Known Location
                  </h3>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {character.location?.name || 'Unknown'}
                  </p>
                  {location && (
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        <span className="font-semibold">Type:</span>{' '}
                        {location.type}
                      </p>
                      <p>
                        <span className="font-semibold">Dimension:</span>{' '}
                        {location.dimension}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Episodes */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Episodes{' '}
                <span className="text-lg font-normal text-gray-500 dark:text-gray-400">
                  ({episodes.length})
                </span>
              </h2>

              {episodes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight pr-2">
                          {episode.name}
                        </h3>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full whitespace-nowrap">
                          {episode.episode}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        📅 {episode.air_date}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                    📺
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No Episodes Available
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Episode information is not available for this character
                  </p>
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
