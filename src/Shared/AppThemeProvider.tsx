import { useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '../Redux/hooks';
import { getDirection } from '../Utils/language';
import { getTheme } from './Styles/theme';

interface AppThemeProviderProps {
  children: ReactNode;
}

const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const themeMode = useAppSelector((state) => state.ui.theme);
  const language = useAppSelector((state) => state.ui.language);
  const direction = getDirection(language);

  const theme = useMemo(() => getTheme(themeMode, direction), [themeMode, direction]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = direction;
    root.style.colorScheme = themeMode;
  }, [language, direction, themeMode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
