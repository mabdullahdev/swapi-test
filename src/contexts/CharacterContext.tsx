import React, { createContext, useReducer } from 'react';
import { CHARACTER_ACTIONS, initialCharacterState } from './characterActions';
import {
  CharacterContextValue,
  CharacterProviderProps,
} from '../types/components';
import { Character, APIInfo } from '../types/api';

// Action interfaces
interface SetLoadingAction {
  type: typeof CHARACTER_ACTIONS.SET_LOADING;
  payload: boolean;
}

interface SetCharactersAction {
  type: typeof CHARACTER_ACTIONS.SET_CHARACTERS;
  payload: Character[];
}

interface SetErrorAction {
  type: typeof CHARACTER_ACTIONS.SET_ERROR;
  payload: string | null;
}

interface SetCurrentCharacterAction {
  type: typeof CHARACTER_ACTIONS.SET_CURRENT_CHARACTER;
  payload: Character | null;
}

interface SetPageInfoAction {
  type: typeof CHARACTER_ACTIONS.SET_PAGE_INFO;
  payload: APIInfo;
}

interface SetCurrentPageAction {
  type: typeof CHARACTER_ACTIONS.SET_CURRENT_PAGE;
  payload: number;
}

interface SetSearchQueryAction {
  type: typeof CHARACTER_ACTIONS.SET_SEARCH_QUERY;
  payload: string;
}

interface ClearErrorAction {
  type: typeof CHARACTER_ACTIONS.CLEAR_ERROR;
}

type CharacterReducerAction =
  | SetLoadingAction
  | SetCharactersAction
  | SetErrorAction
  | SetCurrentCharacterAction
  | SetPageInfoAction
  | SetCurrentPageAction
  | SetSearchQueryAction
  | ClearErrorAction;

// Reducer function
const characterReducer = (
  state: typeof initialCharacterState,
  action: CharacterReducerAction
): typeof initialCharacterState => {
  switch (action.type) {
    case CHARACTER_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CHARACTER_ACTIONS.SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
        loading: false,
        error: null,
      };

    case CHARACTER_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case CHARACTER_ACTIONS.SET_CURRENT_CHARACTER:
      return {
        ...state,
        currentCharacter: action.payload,
        loading: false,
        error: null,
      };

    case CHARACTER_ACTIONS.SET_PAGE_INFO:
      return {
        ...state,
        pageInfo: action.payload,
      };

    case CHARACTER_ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case CHARACTER_ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case CHARACTER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const CharacterContext = createContext<CharacterContextValue | undefined>(
  undefined
);

// Context provider component
export const CharacterProvider: React.FC<CharacterProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(characterReducer, initialCharacterState);

  // Action creators
  const setLoading = (loading: boolean) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_LOADING, payload: loading });
  };

  const setCharacters = (characters: Character[]) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_CHARACTERS, payload: characters });
  };

  const setError = (error: string | null) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_ERROR, payload: error });
  };

  const setCurrentCharacter = (character: Character | null) => {
    dispatch({
      type: CHARACTER_ACTIONS.SET_CURRENT_CHARACTER,
      payload: character,
    });
  };

  const setPageInfo = (pageInfo: APIInfo) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_PAGE_INFO, payload: pageInfo });
  };

  const setCurrentPage = (page: number) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_CURRENT_PAGE, payload: page });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: CHARACTER_ACTIONS.SET_SEARCH_QUERY, payload: query });
  };

  const clearError = () => {
    dispatch({ type: CHARACTER_ACTIONS.CLEAR_ERROR });
  };

  const value: CharacterContextValue = {
    ...state,
    setLoading,
    setCharacters,
    setError,
    setCurrentCharacter,
    setPageInfo,
    setCurrentPage,
    setSearchQuery,
    clearError,
  };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};

export default CharacterContext;
