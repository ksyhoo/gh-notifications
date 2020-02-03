import React from "react";
import "./App.css";
import { Routes } from "./routes";
import { configureStore } from "@reduxjs/toolkit";
import { pullRequestFilterSlice } from "./store/pullRequestFilter";
import { pullRequestsSlice } from "./store/pullRequests";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    pullRequestFilter: pullRequestFilterSlice.reducer,
    pullRequests: pullRequestsSlice.reducer
  }
});

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
};

export default App;
