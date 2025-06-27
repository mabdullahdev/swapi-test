import React, { useState, useEffect } from 'react';
import { getCharacters } from '../services/rickService';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PaginationControls from '../components/PaginationControls';

const CharacterListPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [info, setInfo] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch characters on mount and when page or debounced search query changes
  useEffect(() => {
    fetchCharacters(currentPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery]);

  const fetchCharacters = async (page, name = '') => {
    try {
      // Use searchLoading for search operations, loading for initial load
      if (characters.length === 0) {
        setLoading(true);
      } else {
        setSearchLoading(true);
      }
      setError(null);
      
      const data = await getCharacters(page, name);
      
      setCharacters(data.results);
      setInfo(data.info);
    } catch (err) {
      setError(err.message || 'Failed to fetch characters');
      setCharacters([]);
      setInfo({});
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Reset to page 1 when searching
    setCurrentPage(1);
    setDebouncedSearchQuery(searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Reset to page 1 when search query changes
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
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
    fetchCharacters(currentPage, debouncedSearchQuery);
  };

  // Only show full page loader on initial load
  if (loading && characters.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader message="Loading characters..." />
      </div>
    );
  }

  if (error && characters.length === 0) {
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
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search characters by name..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchLoading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Character Grid with relative loader */}
        <div className="relative">
          {/* Overlay loader for search operations */}
          {searchLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
              <Loader message="Searching characters..." />
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {characters.map((character) => (
              <div key={character.id} className="transform transition-transform duration-200 hover:scale-105">
                <CharacterCard character={character} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Empty State */}
        {characters.length === 0 && !loading && !searchLoading && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤷‍♂️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No characters found</h3>
            <p className="text-gray-500">
              {debouncedSearchQuery ? `No characters found matching "${debouncedSearchQuery}"` : 'Try adjusting your search or filters'}
            </p>
          </div>
        )}

        {/* Error State for search operations */}
        {error && characters.length === 0 && !loading && (
          <div className="text-center py-12">
            <ErrorMessage message={error} onRetry={handleRetry} />
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
                {debouncedSearchQuery && (
                  <span> • Filtered by: "{debouncedSearchQuery}"</span>
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