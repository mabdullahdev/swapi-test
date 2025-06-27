/**
 * Centralized route definitions for the Rick and Morty app
 */

export const ROUTES = {
  HOME: '/',
  CHARACTER_LIST: '/characters',
  CHARACTER_DETAIL: '/character/:id',
  SEARCH: '/search',
  ABOUT: '/about'
};

/**
 * Generate character detail route with ID
 * @param {number|string} id - Character ID
 * @returns {string} Character detail route
 */
export const getCharacterRoute = (id) => {
  return `/character/${id}`;
};

/**
 * Generate search route with query
 * @param {string} query - Search query
 * @returns {string} Search route with query parameter
 */
export const getSearchRoute = (query) => {
  return `/search?q=${encodeURIComponent(query)}`;
};

/**
 * Route configuration for React Router
 */
export const routeConfig = [
  {
    path: ROUTES.HOME,
    name: 'Home',
    exact: true
  },
  {
    path: ROUTES.CHARACTER_LIST,
    name: 'Characters',
    exact: true
  },
  {
    path: ROUTES.CHARACTER_DETAIL,
    name: 'Character Detail',
    exact: true
  },
  {
    path: ROUTES.SEARCH,
    name: 'Search',
    exact: true
  },
  {
    path: ROUTES.ABOUT,
    name: 'About',
    exact: true
  }
];

export default ROUTES; 