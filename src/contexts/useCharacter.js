import { useContext } from 'react';
import CharacterContext from './CharacterContext';

// Custom hook to use the character context
export const useCharacter = () => {
  const context = useContext(CharacterContext);
  
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  
  return context;
}; 