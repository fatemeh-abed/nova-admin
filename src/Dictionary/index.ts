import { Language } from '../types/Enums/Language';
import { en } from './en';
import { fa } from './fa';
import type { Dictionary } from './types';

export type { Dictionary } from './types';

const dictionaries: Record<Language, Dictionary> = {
  [Language.Persian]: fa,
  [Language.English]: en,
};

export const getDictionary = (language: Language): Dictionary => dictionaries[language];
