export interface PullRequest {
  number: number;
  closed: Boolean;
  title: string;
  author: {
    name: string;
  };
  requestedReviewers: string[];
  labels: string[];
  repository: string;
  createdAt: string;
  hasChanged: boolean;
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

export interface State {
  pullRequestFilter: PullRequestFilterState;
  pullRequests: PullRequestsState;
}

export type ReviewStatus = "ACCEPTED" | "CHANGES";
