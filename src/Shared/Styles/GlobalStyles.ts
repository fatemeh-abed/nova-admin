import { createGlobalStyle } from 'styled-components';

// Direction and language are set on <html> by AppThemeProvider.
export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root { height: 100%; }

  body {
    margin: 0;
    min-width: ${({ theme }) => theme.layout.minWidth};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    text-align: start;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`;
