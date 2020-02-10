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

export const Logo = styled.h1`
  font-size: 3em;
  text-transform: uppercase;
  color: ${(_) => _.theme.colors.ui};
  margin: 48px 32px;
  span {
    color: ${(_) => _.theme.colors.primary};
  }
  @media (max-width: 800px) {
    text-align: center;
  }
`;
