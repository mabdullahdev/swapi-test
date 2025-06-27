import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { CHARACTER_ACTIONS, initialCharacterState } from './characterActions';

// Reducer function
const characterReducer = (state, action) => {
  switch (action.type) {
    case CHARACTER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case CHARACTER_ACTIONS.SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
        loading: false,
        error: null
      };
    
    case CHARACTER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case CHARACTER_ACTIONS.SET_CURRENT_CHARACTER:
      return {
        ...state,
        currentCharacter: action.payload,
        loading: false,
        error: null
      };
    
    case CHARACTER_ACTIONS.SET_PAGE_INFO:
      return {
        ...state,
        pageInfo: action.payload
      };
    
    case CHARACTER_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    
    case CHARACTER_ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    
    case CHARACTER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Create context
const CharacterContext = createContext();

// Context provider component
export const CharacterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialCharacterState);

  // Action creators
  const setLoading = (loading) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_LOADING, payload: loading });
  };

  const setCharacters = (characters) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_CHARACTERS, payload: characters });
  };

  const setError = (error) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_ERROR, payload: error });
  };

  const setCurrentCharacter = (character) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_CURRENT_CHARACTER, payload: character });
  };

  const setPageInfo = (pageInfo) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_PAGE_INFO, payload: pageInfo });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_CURRENT_PAGE, payload: page });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_SEARCH_QUERY, payload: query });
  };

  const clearError = () => {
    dispatch({ type: CHARACTER_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    setLoading,
    setCharacters,
    setError,
    setCurrentCharacter,
    setPageInfo,
    setCurrentPage,
    setSearchQuery,
    clearError
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

CharacterProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CharacterContext; 