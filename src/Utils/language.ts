import { Direction } from '../types/Enums/Direction';
import { Language } from '../types/Enums/Language';

const directionByLanguage: Record<Language, Direction> = {
  [Language.Persian]: Direction.RTL,
  [Language.English]: Direction.LTR,
};

export const getDirection = (language: Language): Direction => directionByLanguage[language];

const localeByLanguage: Record<Language, string> = {
  [Language.Persian]: 'fa-IR',
  [Language.English]: 'en-US',
};

export const formatNumber = (value: number, language: Language): string =>
  new Intl.NumberFormat(localeByLanguage[language]).format(value);
