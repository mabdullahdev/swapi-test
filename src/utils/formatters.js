/**
 * Utility functions for formatting data display
 */

/**
 * Formats character status with appropriate styling classes
 * @param {string} status - Character status (alive, dead, unknown)
 * @returns {Object} Object with status text and CSS class
 */
export const formatCharacterStatus = (status) => {
  const normalizedStatus = status?.toLowerCase();
  
  switch (normalizedStatus) {
    case 'alive':
      return {
        text: 'Alive',
        className: 'status-alive'
      };
    case 'dead':
      return {
        text: 'Dead',
        className: 'status-dead'
      };
    case 'unknown':
      return {
        text: 'Unknown',
        className: 'status-unknown'
      };
    default:
      return {
        text: status || 'Unknown',
        className: 'status-unknown'
      };
  }
};

/**
 * Capitalizes the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Formats episode codes for display
 * @param {string} episode - Episode code (e.g., "S01E01")
 * @returns {string} Formatted episode string
 */
export const formatEpisode = (episode) => {
  if (!episode) return '';
  
  // Extract season and episode numbers
  const match = episode.match(/S(\d+)E(\d+)/);
  if (match) {
    const [, season, ep] = match;
    return `Season ${parseInt(season)} Episode ${parseInt(ep)}`;
  }
  
  return episode;
};

/**
 * Truncates text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Formats a number with commas for thousands
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0';
  }
  
  return num.toLocaleString();
}; 