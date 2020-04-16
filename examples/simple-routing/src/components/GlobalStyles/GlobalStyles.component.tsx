import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  body {
    margin: 0px;
    font-family: "Segoe UI", sans-serif;
  }
  #root {
    height: 100%;
    width: 100%;
  }
`;

export default GlobalStyles;
