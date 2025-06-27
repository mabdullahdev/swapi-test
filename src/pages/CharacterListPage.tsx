import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCharacters } from '../services/rickService';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import PaginationControls from '../components/PaginationControls';
import ThemeToggle from '../components/ThemeToggle';
import { Character, APIInfo } from '../types/api';

const CharacterListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<APIInfo>({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  });

  // Get initial values from URL params
  const getPageFromURL = (): number => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    return page > 0 ? page : 1;
  };

  const getSearchFromURL = (): string => {
    return searchParams.get('search') || '';
  };

  const [currentPage, setCurrentPage] = useState<number>(getPageFromURL());
  const [searchQuery, setSearchQuery] = useState<string>(getSearchFromURL());
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>(
    getSearchFromURL()
  );

  // Use refs to prevent infinite loops
  const isInitialized = useRef<boolean>(false);
  const lastFetchRef = useRef<string>('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch characters function
  const fetchCharacters = useCallback(
    async (page: number, name: string = ''): Promise<void> => {
      const fetchKey = `${page}-${name}`;

      // Prevent duplicate API calls
      if (lastFetchRef.current === fetchKey) {
        return;
      }

      lastFetchRef.current = fetchKey;

      try {
        // Show appropriate loading state
        if (!isInitialized.current) {
          setLoading(true);
        } else {
          setSearchLoading(true);
        }
        setError(null);

        const data = await getCharacters(page, name);

        setCharacters(data.results);
        setInfo(data.info);
        isInitialized.current = true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch characters';
        setError(errorMessage);
        setCharacters([]);
        setInfo({
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        });
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    },
    []
  );

  // Initialize from URL on first load
  useEffect(() => {
    const initialPage = getPageFromURL();
    const initialSearch = getSearchFromURL();

    setCurrentPage(initialPage);
    setSearchQuery(initialSearch);
    setDebouncedSearchQuery(initialSearch);

    fetchCharacters(initialPage, initialSearch);
  }, []); // Only run once on mount

  // Update URL when state changes (but only after initialization)
  useEffect(() => {
    if (!isInitialized.current) return;

    const newParams = new URLSearchParams();

    if (currentPage > 1) {
      newParams.set('page', currentPage.toString());
    }

    if (debouncedSearchQuery.trim()) {
      newParams.set('search', debouncedSearchQuery);
    }

    // Update URL without triggering a fetch
    setSearchParams(newParams, { replace: true });
  }, [currentPage, debouncedSearchQuery, setSearchParams]);

  // Handle state changes and fetch data
  useEffect(() => {
    if (!isInitialized.current) return;

    fetchCharacters(currentPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, fetchCharacters]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Reset to page 1 when searching
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      // If already on page 1, trigger search immediately
      setDebouncedSearchQuery(searchQuery);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    setSearchQuery(query);

    // Reset to page 1 when search changes
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handleNextPage = (): void => {
    if (info.next && currentPage < info.pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = (): void => {
    if (info.prev && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleRetry = (): void => {
    lastFetchRef.current = ''; // Reset cache
    fetchCharacters(currentPage, debouncedSearchQuery);
  };

  // Only show full page loader on initial load (when app is first starting)
  if (loading && !isInitialized.current) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Loader message="Loading characters..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center relative">
          {/* Theme Toggle - Positioned absolutely in top right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <ThemeToggle />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Rick and Morty Characters
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Explore the multiverse of characters from the Rick and Morty
            universe
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-12 text-center">
          <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search characters by name..."
                className="block w-full pl-12 pr-12 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              {searchLoading && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Pagination - Before Cards */}
        {characters.length > 0 && (
          <div className="mb-8 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 inline-block border dark:border-gray-700">
              <PaginationControls
                currentPage={currentPage}
                totalPages={info.pages}
                hasNext={!!info.next}
                hasPrev={!!info.prev}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
              />

              {/* Page Info */}
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Showing page{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {currentPage}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {info.pages || '?'}
                  </span>
                  {info.count && (
                    <span className="block sm:inline mt-1 sm:mt-0">
                      {' '}
                      •{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {info.count.toLocaleString()}
                      </span>{' '}
                      total characters
                    </span>
                  )}
                  {debouncedSearchQuery && (
                    <span className="block mt-1">
                      {' '}
                      • Filtered by:{' '}
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        "{debouncedSearchQuery}"
                      </span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Character Grid with relative loader */}
        <div className="relative">
          {/* Overlay loader for search operations */}
          {searchLoading && (
            <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border dark:border-gray-700">
                <Loader message="Searching characters..." />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
            {characters.map((character) => (
              <div
                key={character.id}
                className="w-full max-w-sm transform transition-all duration-300 hover:scale-105 hover:-translate-y-2"
              >
                <CharacterCard character={character} />
              </div>
            ))}
          </div>
        </div>

        {/* Empty State - No Results Found */}
        {characters.length === 0 && !loading && !searchLoading && !error && (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-lg mx-auto border dark:border-gray-700">
              <div className="text-8xl mb-6">
                {debouncedSearchQuery ? '🔍' : '🤷‍♂️'}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {debouncedSearchQuery
                  ? 'No Search Results'
                  : 'No Characters Found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto mb-4">
                {debouncedSearchQuery
                  ? `No characters found matching your search.`
                  : 'No characters are currently available.'}
              </p>
              {debouncedSearchQuery && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">Search term:</span> "
                    {debouncedSearchQuery}"
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    💡 Try different keywords, check spelling, or browse all
                    characters by clearing the search.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Error State for search operations */}
        {error && characters.length === 0 && !loading && !searchLoading && (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-lg mx-auto border dark:border-gray-700">
              <div className="text-6xl mb-6">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {debouncedSearchQuery
                  ? 'No Results Found'
                  : 'Something went wrong'}
              </h3>
              <div className="text-gray-600 dark:text-gray-300 mb-6">
                <ErrorMessage message={error} onRetry={handleRetry} />
              </div>
              {debouncedSearchQuery && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  No characters found matching{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    "{debouncedSearchQuery}"
                  </span>
                  . Try a different search term or check your spelling.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CharacterListPage;
