import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PullRequestsState, PullRequest } from "utils/types";
import { AppThunk } from "store";
import {
  searchPullRequestsGql,
  normalizeGqlResponse,
  getAuthorPullRequests,
  getToReviewPullRequests,
  data
} from "utils/helpers";
import deepEqual from "deep-equal";

const initialState: PullRequestsState = {
  isLoading: false,
  error: null,
  createdPullRequests: [],
  reviewRequestedPullRequests: []
};

export const pullRequestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    getPullRequestsSuccess: (
      state,
      { payload }: PayloadAction<PullRequest[]>
    ) => {
      state.createdPullRequests = getAuthorPullRequests(payload);
      state.reviewRequestedPullRequests = getToReviewPullRequests(payload);
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
    setUpdatesInCreatedPullRequests: (
      state: PullRequestsState,
      action: PayloadAction<any>
    ) => {}
  }
});

const { actions } = pullRequestsSlice;
export const {
  getPullRequestsSuccess,
  getPullRequestsError,
  getPullRequestsLoading,
  setUpdatesInCreatedPullRequests
} = actions;

export const fetchPullRequestsThunk = (
  userInvolvementType: string
): AppThunk => async (dispatch) => {
  try {
    dispatch(getPullRequestsLoading(true));
    const pullRequests = await searchPullRequestsGql(userInvolvementType);
    dispatch(
      getPullRequestsSuccess(
        normalizeGqlResponse(pullRequests && pullRequests.search.edges)
      )
    );
  } catch (err) {
    dispatch(getPullRequestsError(err.toString()));
  }
  dispatch(getPullRequestsLoading(false));
};
export const checkForUpdates = (
  userInvolvementType: string,
  state: PullRequestsState
): AppThunk => async (dispatch) => {
  try {
    const pullRequests = await searchPullRequestsGql(userInvolvementType);
    // const autor = getAuthorPullRequests(
    //   normalizeGqlResponse(pullRequests && pullRequests.search.edges)
    // );
    const modified = state.createdPullRequests.map(
      (pullRequest: PullRequest) => {
        const toCompare = data.find((item) => item.id === pullRequest.id);
        const equal = deepEqual(pullRequest, toCompare);
        if (!equal) {
          console.log("znalazl");
          return { ...toCompare, hasChanged: true };
        }
        return pullRequest;
      }
    );
    console.log(modified);
  } catch (err) {
    dispatch(getPullRequestsError(err.toString()));
  }
};
