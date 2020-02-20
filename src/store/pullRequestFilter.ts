import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PullRequestFilterState } from "utils/types";
import { userRole } from "utils/constants";

const initialState: PullRequestFilterState = {
  userInvolvementType: userRole.author
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
