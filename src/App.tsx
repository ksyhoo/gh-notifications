import React from "react";
import { Routes } from "./routes";
import { store } from "store";
import { Provider } from "react-redux";
import { ThemeProvider } from "utils/styled";
import { GlobalStyles } from "components/styled";
import { mainTheme } from "themes";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <>
          <GlobalStyles />
          <Routes />
        </>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
