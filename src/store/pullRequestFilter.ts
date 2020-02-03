import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PullRequestFilterState } from "../utils/types";

export const pullRequestFilterSlice = createSlice({
  name: "filter",
  initialState: {
    showPullRequests: "author"
  },
  reducers: {
    setPullRequestFilter: (
      state: PullRequestFilterState,
      action: PayloadAction<string>
    ) => {
      state.showPullRequests = action.payload;
    }
  }
});

const { actions } = pullRequestFilterSlice;
export const { setPullRequestFilter } = actions;
