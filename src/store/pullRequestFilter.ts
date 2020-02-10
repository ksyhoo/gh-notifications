import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PullRequestFilterState } from "utils/types";

const initialState: PullRequestFilterState = {
  userInvolvementType: "author"
};

export const pullRequestFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPullRequestFilter: (
      state: PullRequestFilterState,
      { payload }: PayloadAction<string>
    ) => {
      state.userInvolvementType = payload;
    }
  }
});

const { actions } = pullRequestFilterSlice;
export const { setPullRequestFilter } = actions;
