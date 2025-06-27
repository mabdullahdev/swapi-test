/**
 * Extracts ID from Rick and Morty API URLs
 * The API returns URLs like: "https://rickandmortyapi.com/api/character/1"
 * This function extracts the numeric ID from the end of the URL
 *
 * @param {string} url - The API URL containing an ID
 * @returns {number|null} The extracted ID as a number, or null if not found
 */
export const extractIdFromUrl = (url: string): number | null => {
  if (!url || typeof url !== 'string') {
    return null;
  }

  try {
    // Split the URL by '/' and get the last segment
    const segments = url.split('/');
    const idString = segments[segments.length - 1];

    // Parse the ID as an integer
    const id = parseInt(idString, 10);

    // Return the ID if it's a valid number, otherwise null
    return isNaN(id) ? null : id;
  } catch (error) {
    console.error('Error extracting ID from URL:', error);
    return null;
  }
};

/**
 * Extracts multiple IDs from an array of URLs
 * @param {Array<string>} urls - Array of API URLs
 * @returns {Array<number>} Array of extracted IDs
 */
export const extractIdsFromUrls = (urls: string[]): number[] => {
  if (!Array.isArray(urls)) {
    return [];
  }

  return urls.map(extractIdFromUrl).filter((id): id is number => id !== null);
};

/**
 * Checks if a URL is a valid Rick and Morty API URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if it's a valid Rick and Morty API URL
 */
export const isValidRickAndMortyUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const rickAndMortyPattern =
    /^https:\/\/rickandmortyapi\.com\/api\/(character|location|episode)\/\d+$/;
  return rickAndMortyPattern.test(url);
};

export default extractIdFromUrl;
