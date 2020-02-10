import { configureStore, Action } from "@reduxjs/toolkit";
import { pullRequestFilterSlice } from "./pullRequestFilter";
import { pullRequestsSlice } from "./pullRequests";
import { ThunkAction } from "redux-thunk";
import { State } from "utils/types";

export const store = configureStore({
  reducer: {
    pullRequestFilter: pullRequestFilterSlice.reducer,
    pullRequests: pullRequestsSlice.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, State, null, Action<string>>;
