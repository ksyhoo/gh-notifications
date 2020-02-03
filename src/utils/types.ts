export interface Issue {
  number: number;
  state: string;
  title: string;
  user: {
    name: string;
  };
  labels: [string];
  assignee: {
    login: string;
  };
  assignees: [];
  repository: string;
  createdAt: string;
  updatedAt: string;
}

export interface PullRequestFilterState {
  showPullRequests: string;
}
export interface PullRequestsState {
  pullRequests: Issue[];
}
