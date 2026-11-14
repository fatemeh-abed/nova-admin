import { Language } from '../types/Enums/Language';
import { Theme } from '../types/Enums/Theme';

export interface Preferences {
  theme: Theme;
  language: Language;
}

const STORAGE_KEY = 'nova-admin:preferences';

export const defaultPreferences: Preferences = {
  theme: Theme.Light,
  language: Language.Persian,
};

const isTheme = (value: unknown): value is Theme =>
  Object.values(Theme).includes(value as Theme);

const isLanguage = (value: unknown): value is Language =>
  Object.values(Language).includes(value as Language);

// Only non-sensitive UI preferences are stored here. Anything unreadable or invalid
// falls back to the defaults.
export const loadPreferences = (): Preferences => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPreferences;
    const parsed: Partial<Record<keyof Preferences, unknown>> = JSON.parse(raw);
    return {
      theme: isTheme(parsed.theme) ? parsed.theme : defaultPreferences.theme,
      language: isLanguage(parsed.language) ? parsed.language : defaultPreferences.language,
    };
  } catch {
    return defaultPreferences;
  }
};

export const savePreferences = (preferences: Preferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage may be unavailable (private mode, quota); preferences then last for the session.
  }
};
