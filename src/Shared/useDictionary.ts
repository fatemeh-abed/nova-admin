import { getDictionary } from '../Dictionary';
import type { Dictionary } from '../Dictionary';
import { useAppSelector } from '../Redux/hooks';

export const useDictionary = (): Dictionary => {
  const language = useAppSelector((state) => state.ui.language);
  return getDictionary(language);
};
