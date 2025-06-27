import React, { useState, useEffect } from 'react';
import { getCharacters } from '../services/rickService';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PaginationControls from '../components/PaginationControls';

const CharacterListPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({});

  // Fetch characters on mount and when page changes
  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getCharacters(page);
      
      setCharacters(data.results);
      setInfo(data.info);
    } catch (err) {
      setError(err.message || 'Failed to fetch characters');
      setCharacters([]);
      setInfo({});
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterClick = (character) => {
    // Navigation to character detail will be implemented here
    console.log('Character clicked:', character);
  };

  const handleNextPage = () => {
    if (info.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (info.prev) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRetry = () => {
    fetchCharacters(currentPage);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader message="Loading characters..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Rick and Morty Characters
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Explore the multiverse of characters from the Rick and Morty universe
            </p>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {characters.map((character) => (
            <div key={character.id} className="transform transition-transform duration-200 hover:scale-105">
              <CharacterCard 
                character={character}
                onClick={handleCharacterClick}
              />
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {characters.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤷‍♂️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No characters found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
      
      {/* Pagination */}
      {characters.length > 0 && (
        <div className="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <PaginationControls
              currentPage={currentPage}
              totalPages={info.pages}
              hasNext={!!info.next}
              hasPrev={!!info.prev}
              onNext={handleNextPage}
              onPrev={handlePrevPage}
            />
            
            {/* Page Info */}
            <div className="text-center pb-6">
              <p className="text-sm text-gray-600">
                Showing page {currentPage} of {info.pages || '?'} 
                {info.count && (
                  <span> • Total characters: {info.count.toLocaleString()}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterListPage; 