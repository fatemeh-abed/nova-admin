import { Direction } from '../types/Enums/Direction';
import { Language } from '../types/Enums/Language';

const directionByLanguage: Record<Language, Direction> = {
  [Language.Persian]: Direction.RTL,
  [Language.English]: Direction.LTR,
};

export const getDirection = (language: Language): Direction => directionByLanguage[language];
