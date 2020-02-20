import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

export interface Theme {
  colors: {
    background: string;
    primary: string;
    text: string;
    ui: string;
    meta: string;
    white: string;
    positive: string;
    negative: string;
    opaqueNewPR: string;
  };
  fonts: {
    notifications: string;
  };
}

const {
  default: styled,
  css,
  keyframes,
  ThemeProvider,
  createGlobalStyle
} = styledComponents as ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
