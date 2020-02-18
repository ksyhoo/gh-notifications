import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PullRequestsState, PullRequest } from "utils/types";
import { AppThunk } from "store";
import {
  searchPullRequestsGql,
  normalizeGqlResponse,
  getAuthorPullRequests,
  getToReviewPullRequests,
  mockData,
  normalizeGqlResponseToObject
} from "utils/helpers";
import deepEqual from "deep-equal";

import { GraphQLNormalizr } from "graphql-normalizr";

// const config = ...
const { normalize } = new GraphQLNormalizr({});

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

    checkForUpdatesAuthorPullRequests: (
      state,
      { payload }: PayloadAction<PullRequest[]>
    ) => {
      state.createdPullRequests.forEach((pullRequest: PullRequest) => {
        const toCompare = payload.find(
          (payloadItem: PullRequest) => payloadItem.id === pullRequest.id
        );
        const index = state.createdPullRequests.findIndex(
          (item: PullRequest) => item.id === pullRequest.id
        );
        if (deepEqual(toCompare, pullRequest)) {
          state.createdPullRequests[index] = pullRequest;
        }
        state.createdPullRequests[index] = toCompare as PullRequest;
      });
    },
    checkForUpdatesReviewRequestedPullRequests: (
      state,
      { payload }: PayloadAction<PullRequest[]>
    ) => {
      const newRequests = checkForNewReviewRequests(
        payload,
        state.reviewRequestedPullRequests
      );

      state.reviewRequestedPullRequests = newRequests;
    }
  }
});

const { actions } = pullRequestsSlice;
export const {
  checkForUpdatesAuthorPullRequests,
  checkForUpdatesReviewRequestedPullRequests,
  getPullRequestsSuccess,
  getPullRequestsError,
  getPullRequestsLoading
} = actions;

export const fetchPullRequests = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getPullRequestsLoading(true));
    const pullRequests = await searchPullRequestsGql();
    if (pullRequests) {
      const asd = normalizeGqlResponseToObject(pullRequests.search.edges, "id");
      console.log(asd);

      dispatch(
        getPullRequestsSuccess(normalizeGqlResponse(pullRequests.search.edges))
      );
    }
  } catch (err) {
    console.log(err);
    dispatch(getPullRequestsError(err.toString()));
  }
  dispatch(getPullRequestsLoading(false));
};

//FIXME: remove mocked data with api response
export const checkForUpdatesInStore = (data?: any): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(
      checkForUpdatesAuthorPullRequests(getAuthorPullRequests(mockData))
    );
    dispatch(
      checkForUpdatesReviewRequestedPullRequests(
        getToReviewPullRequests(mockData)
      )
    );
  } catch (err) {
    dispatch(getPullRequestsError(err.toString()));
  }
};

//FIXME: Apply store updating values
const checkForNewReviewRequests = (
  data: any, // this should be fetched new data
  reviewRequestedPullRequests: PullRequest[]
) => {
  if (data.length > reviewRequestedPullRequests.length) {
    const modified = data.map((item: PullRequest) => {
      const found = reviewRequestedPullRequests.find(
        (pr: PullRequest) => pr.id === item.id
      );
      if (!found) {
        return { ...item, isNewReviewRequest: true };
      }
      return found;
    });
    return modified;
  } else if (data.length < reviewRequestedPullRequests.length) {
    return data;
  }
  return reviewRequestedPullRequests;
};
