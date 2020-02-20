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
  items: { [id: string]: PullRequest };
}

export interface NotificationsState {
  isUserAuthor: boolean;
  reviewStatus: ReviewStatus | undefined;
}

export interface State {
  pullRequestFilter: PullRequestFilterState;
  pullRequests: PullRequestsState;
}

export type ReviewStatus = "ACCEPTED" | "CHANGES";
