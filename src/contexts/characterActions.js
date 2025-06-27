// Action types for character context
export const CHARACTER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CHARACTERS: 'SET_CHARACTERS',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_CHARACTER: 'SET_CURRENT_CHARACTER',
  SET_PAGE_INFO: 'SET_PAGE_INFO',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state for character context
export const initialCharacterState = {
  characters: [],
  currentCharacter: null,
  loading: false,
  error: null,
  pageInfo: {
    count: 0,
    pages: 0,
    next: null,
    prev: null
  },
  currentPage: 1,
  searchQuery: ''
}; 