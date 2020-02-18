import styled, { createGlobalStyle } from "utils/styled";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background: ${(_) => _.theme.colors.background};
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
  }
`;

export const Container = styled.main`
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;
