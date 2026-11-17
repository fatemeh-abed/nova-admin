import { Direction } from "../../types/Enums/Direction";
import { Theme } from "../../types/Enums/Theme";
import { darkMode } from "./darkTheme";
import { lightMode } from "./lightTheme";

export interface ThemeColors {
  primary: string;
  accent: string;
  highlight: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  onAccent: string;
  sidebarBackground: string;
  sidebarText: string;
  sidebarActiveText: string;
  danger: string;
  success: string;
  focusRing: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
}

export interface ThemeMode {
  mode: Theme;
  colors: ThemeColors;
  shadows: ThemeShadows;
}

const tokens = {
  fontFamily: "'Vazirmatn', Tahoma, 'Segoe UI', system-ui, sans-serif",
  fontSizes: {
    xs: "12px",
    sm: "13px",
    md: "15px",
    lg: "18px",
    xl: "22px",
    xxl: "28px",
  },
  fontWeights: { regular: 400, medium: 500, semibold: 600, bold: 800 },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  radius: { sm: "8px", md: "14px", lg: "20px", pill: "999px" },
  breakpoints: { desktop: "1280px" },
  layout: { sidebarWidth: "210px", headerHeight: "68px", minWidth: "1280px" },
};

export type AppTheme = typeof tokens &
  ThemeMode & {
    direction: Direction;
  };

const modes: Record<Theme, ThemeMode> = {
  [Theme.Light]: lightMode,
  [Theme.Dark]: darkMode,
};

export const getTheme = (theme: Theme, direction: Direction): AppTheme => ({
  ...tokens,
  ...modes[theme],
  direction,
});
