import { Theme } from '../../types/Enums/Theme';
import type { ThemeMode } from './theme';

export const lightMode: ThemeMode = {
  mode: Theme.Light,
  colors: {
    primary: '#0f1b33',
    accent: '#f97316',
    highlight: '#2563eb',
    background: '#faf8f4',
    surface: '#ffffff',
    surfaceAlt: '#f3f1ec',
    border: '#e6e8ee',
    text: '#0f1b33',
    textMuted: '#5f6b85',
    onAccent: '#ffffff',
    sidebarBackground: '#0f1b33',
    sidebarText: 'rgba(255, 255, 255, 0.75)',
    sidebarActiveText: '#ffffff',
    danger: '#dc2626',
    success: '#16a34a',
    focusRing: '#2563eb',
  },
  shadows: {
    sm: '0 1px 4px rgba(15, 27, 51, 0.06)',
    md: '0 2px 12px rgba(15, 27, 51, 0.08)',
  },
};
