import { Theme } from '../../types/Enums/Theme';
import type { ThemeMode } from './theme';

export const darkMode: ThemeMode = {
  mode: Theme.Dark,
  colors: {
    primary: '#e8ecf5',
    accent: '#f97316',
    highlight: '#3b82f6',
    background: '#0b1220',
    surface: '#141d31',
    surfaceAlt: '#1b2742',
    border: '#2e3b5c',
    text: '#e8ecf5',
    textMuted: '#9aa6c1',
    onAccent: '#ffffff',
    sidebarBackground: '#070d19',
    sidebarText: 'rgba(232, 236, 245, 0.7)',
    sidebarActiveText: '#ffffff',
    danger: '#f87171',
    success: '#4ade80',
    focusRing: '#60a5fa',
  },
  shadows: {
    sm: '0 1px 4px rgba(0, 0, 0, 0.4)',
    md: '0 2px 12px rgba(0, 0, 0, 0.5)',
  },
};
