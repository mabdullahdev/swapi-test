import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PaginationControls from '../components/PaginationControls';

const CharacterListPage = () => {
  const [characters, _setCharacters] = useState([]);
  const [loading, _setLoading] = useState(true);
  const [error, _setError] = useState(null);
  const [currentPage, _setCurrentPage] = useState(1);
  const [pageInfo, _setPageInfo] = useState({});

  // Component logic will be implemented here
  useEffect(() => {
    // Fetch characters logic will be added here
  }, [currentPage]);

  const handleCharacterClick = (character) => {
    // Navigation to character detail will be implemented here
    console.log('Character clicked:', character);
  };

  const handleNextPage = () => {
    // Next page logic will be implemented here
  };

  const handlePrevPage = () => {
    // Previous page logic will be implemented here
  };

  const handleRetry = () => {
    // Retry logic will be implemented here
  };

  if (loading) {
    return <Loader message="Loading characters..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Rick and Morty Characters</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {characters.map((character) => (
            <CharacterCard 
              key={character.id} 
              character={character} 
              onClick={handleCharacterClick}
            />
          ))}
        </div>
        
        {characters.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No characters found</p>
          </div>
        )}
      </main>
      
      <PaginationControls
        currentPage={currentPage}
        totalPages={pageInfo.pages}
        hasNext={!!pageInfo.next}
        hasPrev={!!pageInfo.prev}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </div>
  );
};

export default CharacterListPage; 