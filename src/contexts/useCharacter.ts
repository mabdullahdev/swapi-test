import { useContext } from 'react';
import CharacterContext from './CharacterContext';
import { CharacterContextValue } from '../types/components';

/**
 * Custom hook to access the CharacterContext
 * Throws an error if used outside of CharacterProvider
 */
export const useCharacter = (): CharacterContextValue => {
  const context = useContext(CharacterContext);

  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }

  return context;
};

export default useCharacter;
