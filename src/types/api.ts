// Character types
export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

// Episode types
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

// Location types
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

// API Info pagination
export interface APIInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

// API Response wrapper
export interface APIResponse<T> {
  info: APIInfo;
  results: T[];
}

// Single API Response (for individual character/episode/location)
export interface SingleAPIResponse<T> {
  info?: APIInfo;
  results?: T[];
}

// Character response specifically
export type CharactersResponse = APIResponse<Character>;

// Episode response specifically
export type EpisodesResponse = APIResponse<Episode>;

// Location response specifically
export type LocationsResponse = APIResponse<Location>;

// Error types
export interface APIError {
  error: string;
  message?: string;
}
