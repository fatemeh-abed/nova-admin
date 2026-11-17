import { createGlobalStyle } from "styled-components";

import VazirRegular from "../../Assets/Fonts/Vazirmatn-Regular.woff2";
import VazirMedium from "../../Assets/Fonts/Vazirmatn-Medium.woff2";
import VazirSemiBold from "../../Assets/Fonts/Vazirmatn-SemiBold.woff2";
import VazirBold from "../../Assets/Fonts/Vazirmatn-Bold.woff2";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Vazirmatn";
    src: url(${VazirRegular}) format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Vazirmatn";
    src: url(${VazirMedium}) format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Vazirmatn";
    src: url(${VazirSemiBold}) format("woff2");
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Vazirmatn";
    src: url(${VazirBold}) format("woff2");
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily};
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }
`;
