import PullRequests from "./";
import React from "react";
import { PullRequest } from "utils/types";

export default {
  component: PullRequests,
  title: "Pull Requests"
};
const data = ({
  id: "MDExOlB1bGxSZXF1ZXN0MzM4NTk5NTg4",
  number: 212,
  url: "https://github.com/netguru/porsche-oneday-fe/pull/1",
  title: "Initial setup aaa",
  createdAt: "2019-11-08T10:00:57Z",
  updatedAt: "2019-11-08T14:53:09Z",
  closed: false,
  reviewRequests: {
    edges: []
  },
  author: "ksyhoo",
  labels: {},
  headRepository: {
    __typename: "Repository",
    name: "porsche-oneday-fe"
  },
  requestedReviewers: [],
  repository: "porsche-oneday-fe",
  hasChanged: false
} as unknown) as PullRequest;

export const Default = () => {
  return <PullRequests data={data} shouldItemUpdate={false} />;
};
export const Updated = () => {
  return <PullRequests data={data} shouldItemUpdate={true} />;
};
