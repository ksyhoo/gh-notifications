import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PullRequestsState, PullRequest } from "utils/types";
import { AppThunk } from "store";
import {
  searchPullRequestsGql,
  mockData,
  normalizeGqlResponseToObject
} from "utils/helpers";
import deepEqual from "deep-equal";

const initialState: PullRequestsState = {
  isLoading: false,
  error: null,
  items: {}
};

export const pullRequestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    getPullRequestsSuccess: (
      state,
      { payload }: PayloadAction<{ [id: string]: PullRequest }>
    ) => {
      state.items = payload;
    },
    getPullRequestsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    getPullRequestsError: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.error = payload;
    },
    checkForUpdates: (
      state,
      { payload }: PayloadAction<{ [id: string]: PullRequest }>
    ) => {
      for (var item in payload) {
        if (!deepEqual(state.items[item], payload[item])) {
          state.items[item] = { ...payload[item], hasChanged: true };
        } else {
          // TODO: hande equality
        }
      }
    }
  }
});

const { actions } = pullRequestsSlice;
export const {
  checkForUpdates,
  getPullRequestsSuccess,
  getPullRequestsError,
  getPullRequestsLoading
} = actions;

export const fetchPullRequests = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getPullRequestsLoading(true));
    const pullRequests = await searchPullRequestsGql();
    if (pullRequests) {
      const normalized = normalizeGqlResponseToObject(
        pullRequests.search.edges,
        "id"
      );
      dispatch(getPullRequestsSuccess(normalized));
    }
  } catch (err) {
    console.warn(err);
    dispatch(getPullRequestsError(err.toString()));
  }
  dispatch(getPullRequestsLoading(false));
};

// FIXME: remove mocked data with api response
export const checkForUpdatesInStore = (data?: any): AppThunk => async (
  dispatch
) => {
  try {
    const normalized = normalizeGqlResponseToObject(mockData, "id");
    dispatch(checkForUpdates(normalized));
  } catch (err) {
    dispatch(getPullRequestsError(err.toString()));
  }
};
