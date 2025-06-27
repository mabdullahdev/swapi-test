import { Character, Episode, Location, CharactersResponse } from '../types/api';

const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Rick and Morty API Service
 * Documentation: https://rickandmortyapi.com/documentation/#rest
 */

/**
 * Get characters with pagination and optional name filter
 * @param {number} page - Page number (default: 1)
 * @param {string} name - Optional name filter
 * @returns {Promise<{info: Object, results: Array}>} Characters data with pagination info
 */
export const getCharacters = async (
  page: number = 1,
  name: string = ''
): Promise<CharactersResponse> => {
  try {
    let url = `${BASE_URL}/character/?page=${page}`;

    // Add name filter if provided
    if (name && name.trim()) {
      url += `&name=${encodeURIComponent(name.trim())}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No characters found for this page');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CharactersResponse = await response.json();

    // Ensure structured return format
    return {
      info: data.info || {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: data.results || [],
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

/**
 * Get a single character by ID
 * @param {number|string} id - Character ID
 * @returns {Promise<Object>} Character data
 */
export const getCharacter = async (id: number | string): Promise<Character> => {
  try {
    if (!id) {
      throw new Error('Character ID is required');
    }

    const response = await fetch(`${BASE_URL}/character/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Character with ID ${id} not found`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Character = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching character ${id}:`, error);
    throw error;
  }
};

/**
 * Get multiple episodes by IDs
 * @param {Array<number|string>} idsArray - Array of episode IDs
 * @returns {Promise<Array<Object>|Object>} Episode data (array if multiple, object if single)
 */
export const getMultipleEpisodes = async (
  idsArray: (number | string)[]
): Promise<Episode[] | Episode> => {
  try {
    if (!Array.isArray(idsArray) || idsArray.length === 0) {
      throw new Error('Episode IDs array is required and cannot be empty');
    }

    // Filter out any invalid IDs
    const validIds = idsArray.filter((id) => id && !isNaN(Number(id)));

    if (validIds.length === 0) {
      throw new Error('No valid episode IDs provided');
    }

    const response = await fetch(`${BASE_URL}/episode/${validIds.join(',')}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Episodes not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Episode[] | Episode = await response.json();

    // API returns single object for one ID, array for multiple IDs
    // Maintain this behavior for consistency
    return data;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};

/**
 * Get location by URL (optional)
 * @param {string} url - Full URL to the location endpoint
 * @returns {Promise<Object>} Location data
 */
export const getLocation = async (url: string): Promise<Location> => {
  try {
    if (!url || typeof url !== 'string') {
      throw new Error('Location URL is required and must be a string');
    }

    // Validate that it's a Rick and Morty API URL
    if (!url.includes('rickandmortyapi.com/api/location/')) {
      throw new Error('Invalid Rick and Morty API location URL');
    }

    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Location not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Location = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching location:', error);
    throw error;
  }
};

// Default export for backward compatibility
const RickService = {
  getCharacters,
  getCharacter,
  getMultipleEpisodes,
  getLocation,
};

export default RickService;
