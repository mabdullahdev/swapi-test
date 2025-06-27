const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Rick and Morty API Service
 * Documentation: https://rickandmortyapi.com/documentation/#rest
 */

class RickService {
  /**
   * Get all characters with pagination
   * @param {number} page - Page number (default: 1)
   * @param {string} name - Filter by name
   * @param {string} status - Filter by status (alive, dead, unknown)
   * @param {string} species - Filter by species
   * @param {string} gender - Filter by gender (female, male, genderless, unknown)
   * @returns {Promise<Object>} Characters data with pagination info
   */
  static async getCharacters(page = 1, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...filters
      });
      
      const response = await fetch(`${BASE_URL}/character?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  }

  /**
   * Get a single character by ID
   * @param {number|string} id - Character ID
   * @returns {Promise<Object>} Character data
   */
  static async getCharacterById(id) {
    try {
      const response = await fetch(`${BASE_URL}/character/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching character:', error);
      throw error;
    }
  }

  /**
   * Get multiple characters by IDs
   * @param {Array<number|string>} ids - Array of character IDs
   * @returns {Promise<Array<Object>>} Array of character data
   */
  static async getMultipleCharacters(ids) {
    try {
      const idsString = ids.join(',');
      const response = await fetch(`${BASE_URL}/character/${idsString}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error('Error fetching multiple characters:', error);
      throw error;
    }
  }

  /**
   * Get all locations with pagination
   * @param {number} page - Page number (default: 1)
   * @param {string} name - Filter by name
   * @param {string} type - Filter by type
   * @param {string} dimension - Filter by dimension
   * @returns {Promise<Object>} Locations data with pagination info
   */
  static async getLocations(page = 1, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...filters
      });
      
      const response = await fetch(`${BASE_URL}/location?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  /**
   * Get all episodes with pagination
   * @param {number} page - Page number (default: 1)
   * @param {string} name - Filter by name
   * @param {string} episode - Filter by episode code
   * @returns {Promise<Object>} Episodes data with pagination info
   */
  static async getEpisodes(page = 1, filters = {}) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...filters
      });
      
      const response = await fetch(`${BASE_URL}/episode?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching episodes:', error);
      throw error;
    }
  }

  /**
   * Search characters by name
   * @param {string} query - Search query
   * @returns {Promise<Object>} Search results
   */
  static async searchCharacters(query) {
    try {
      return await this.getCharacters(1, { name: query });
    } catch (error) {
      console.error('Error searching characters:', error);
      throw error;
    }
  }
}

export default RickService; 