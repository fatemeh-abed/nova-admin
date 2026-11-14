import { createGlobalStyle } from 'styled-components';

// Phase 1 visual foundation (light only). Proper theming is Phase 3.
export const GlobalStyles = createGlobalStyle`
  :root {
    --nova-navy: #0f1b33;
    --nova-navy-soft: #1b2a4a;
    --nova-orange: #f97316;
    --nova-bg: #faf8f4;
    --nova-surface: #ffffff;
    --nova-text: #0f1b33;
    --nova-muted: #6b7690;
    --nova-border: #e6e8ee;
    --nova-radius: 14px;
    --nova-shadow: 0 2px 12px rgba(15, 27, 51, 0.06);
  }

  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root { height: 100%; }

  body {
    margin: 0;
    background: var(--nova-bg);
    color: var(--nova-text);
    font-family: 'Vazirmatn', Tahoma, 'Segoe UI', system-ui, sans-serif;
    min-width: 1280px;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }
`;
