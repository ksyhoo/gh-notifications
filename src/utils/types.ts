export interface PullRequest {
  number: number;
  closed: boolean;
  title: string;
  author: {
    name: string;
  };
  requestedReviewers: string[];
  labels: string[];
  repository: string;
  createdAt: string;
  updatedAt: string;
  hasChanged: boolean;
  isNewReviewRequest?: boolean;
  id: string;
}

export interface PullRequestFilterState {
  userInvolvementType: string;
}

export interface PullRequestsState {
  isLoading: boolean;
  error: string | null;
  createdPullRequests: PullRequest[];
  reviewRequestedPullRequests: PullRequest[];
}
// export interface PullRequestsState {
//   isLoading: boolean;
//   error: string | null;
//   createdPullRequests: { [id: string]: PullRequest };
//   reviewRequestedPullRequests: PullRequest[];
// }

export interface NotificationsState {
  isUserAuthor: boolean;
  reviewStatus: ReviewStatus | undefined;
}

export interface State {
  pullRequestFilter: PullRequestFilterState;
  pullRequests: PullRequestsState;
}

export type ReviewStatus = "ACCEPTED" | "CHANGES";
