import { Character, APIInfo } from './api';

// Component prop types
export interface CharacterCardProps {
  character: Character;
}

export interface LoaderProps {
  message?: string;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export interface PaginationControlsProps {
  currentPage: number;
  totalPages?: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
}

export interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

export interface FilterBarProps {
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
  onClearFilters: () => void;
}

export interface ThemeToggleProps {
  className?: string;
}

// Character context types
export interface CharacterContextState {
  characters: Character[];
  currentCharacter: Character | null;
  loading: boolean;
  error: string | null;
  pageInfo: APIInfo;
  currentPage: number;
  searchQuery: string;
}

export interface CharacterContextActions {
  setLoading: (loading: boolean) => void;
  setCharacters: (characters: Character[]) => void;
  setError: (error: string | null) => void;
  setCurrentCharacter: (character: Character | null) => void;
  setPageInfo: (pageInfo: APIInfo) => void;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  clearError: () => void;
}

export interface CharacterContextValue
  extends CharacterContextState,
    CharacterContextActions {}

export interface CharacterProviderProps {
  children: React.ReactNode;
}

// Action types for reducer
export interface CharacterAction {
  type: string;
  payload?: any;
}

// Status formatting return type
export interface StatusInfo {
  text: string;
  className: string;
  color: string;
}
