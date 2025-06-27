import { APIInfo, Character } from '../types/api';

// Action types for character context
export const CHARACTER_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_CHARACTERS: 'SET_CHARACTERS',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_CHARACTER: 'SET_CURRENT_CHARACTER',
  SET_PAGE_INFO: 'SET_PAGE_INFO',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  CLEAR_ERROR: 'CLEAR_ERROR',
} as const;

// Action types
export type CharacterActionType =
  (typeof CHARACTER_ACTIONS)[keyof typeof CHARACTER_ACTIONS];

// Initial state for character context
export const initialCharacterState = {
  characters: [] as Character[],
  currentCharacter: null as Character | null,
  loading: false,
  error: null as string | null,
  pageInfo: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  } as APIInfo,
  currentPage: 1,
  searchQuery: '',
};
