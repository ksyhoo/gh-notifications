import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PullRequestsState } from "../utils/types";

export const pullRequestsSlice = createSlice({
  name: "requests",
  initialState: {
    pullRequests: []
  },
  reducers: {
    setPullRequests: (state: PullRequestsState, action: PayloadAction<any>) => {
      state.pullRequests = action.payload;
    }
  }
});

const { actions } = pullRequestsSlice;
export const { setPullRequests } = actions;
