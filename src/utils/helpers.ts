import { graphqlWithAuth } from "./octo-client";
import { GraphQlQueryResponseData } from "@octokit/graphql/dist-types/types";
import { PullRequest } from "./types";
import { node } from "prop-types";

export const getAuthorPullRequests = (data: any): [PullRequest] =>
  data.filter(({ author }: any) => author === "ksyhoo");

export const getToReviewPullRequests = (data: any): [PullRequest] =>
  data.filter(({ requestedReviewers }: PullRequest) =>
    requestedReviewers.find((item: string) => item === "jonny22094")
  );

//FIXME: simlify, destructcure, type node
export const normalizeGqlResponse = (data: Array<any>) =>
  data.map(({ node }: any) => ({
    title: node.title,
    closed: node.closed,
    author: node.author.login,
    labels: { ...node.labels.edges },
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
    number: node.number,
    repository: node.headRepository.name,
    requestedReviewers: node.reviewRequests.edges.map(
      ({ node }: any) => node.requestedReviewer.login
    ),
    hasChanged: false,
    id: node.id
  }));

export const normalizeGqlResponseToObject = (data: Array<any>, key: string) => {
  const initialValue = {};
  return data.reduce((obj, item) => {
    return {
      ...obj,
      [item.node[key]]: {
        ...item.node,
        reviewRequests: item.node.reviewRequests.edges.map(
          ({ node }) => node.requestedReviewer.login
        ),
        author: item.node.author.login,
        labels: item.node.labels.edges.map(({ node }) => node),
        headRepository: item.node.headRepository.name
      }
    };
  }, initialValue);
};

// data.map(({ node }: any) => ({
//   title: node.title,
//   closed: node.closed,
//   author: node.author.login,
//   labels: { ...node.labels.edges },
//   createdAt: node.createdAt,
//   updatedAt: node.updatedAt,
//   number: node.number,
//   repository: node.headRepository.name,
//   requestedReviewers: node.reviewRequests.edges.map(
//     ({ node }: any) => node.requestedReviewer.login
//   ),
//   hasChanged: false,
//   id: node.id
// }));

// involves:USERNAME

const PullRequestQuery = `
  {
    search(query: "involves:ksyhoo is:pr state:open", type: ISSUE, first: 10) {
      edges {
        node {
          ... on PullRequest {
            id
            number
            url
            title
            createdAt
            updatedAt
            closed
            reviewRequests(first:50) {
              edges {
                node {
                  __typename
                  id
                  requestedReviewer {
                    ... on User {
                      __typename
                      login
                    }
                  }
                }
              }
            }
            author {
              ... on User {
                __typename
                login
              }
            }
            labels(first:50) {
              edges {
                node {
                  __typename
                  name
                  id
                }
              }
            }
            headRepository {
              ... on Repository {
              __typename
              name
              }
            }
           }
        }
      }
    }
  }
  `;

export const searchPullRequestsGql = async (): Promise<
  GraphQlQueryResponseData
> => await graphqlWithAuth(PullRequestQuery);

// assignees
// participants
// reviewRequests
// reviews
// lastEditedAt
// status
// updatedAt

export const data = [
  {
    title: "[AR -1274] fix layout aaaa",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-27T10:33:52Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 152,
    repository: "artemest-vtools-front",
    requestedReviewers: ["jonny22094"],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU3MTk1MTI1"
  },
  {
    title: "[AR-1424] Merchandising rework aaa",
    closed: true,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-20T09:00:45Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 151,
    repository: "artemest-vtools-front",
    requestedReviewers: ["jonny22094"],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU1NjI1MDY5"
  },
  {
    title: "fix cookie not removing on logout aaa",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-19T14:43:59Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 149,
    repository: "artemest-vtools-front",
    requestedReviewers: ["wooojek"],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU1MTgwNTcw"
  },
  {
    title: "[AR-1361] Removed hard coded data DataTypes",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-19T10:46:12Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 148,
    repository: "artemest-vtools-front",
    requestedReviewers: ["jonny22094"],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU1MDc2NTM0"
  },
  {
    title: "[ AR - 1300 ] Connecting Vendor Export View UI with backend",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-19T09:49:40Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 147,
    repository: "artemest-vtools-front",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU1MDQ4MDQ2"
  },
  {
    title: "[ AR - 1115 ] Show approving  controls only to approver",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-18T12:47:40Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 146,
    repository: "artemest-vtools-front",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU0NTk1ODE3"
  },
  {
    title: "[AR - 1283] display all colections of vendor with their SKUs",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-18T09:17:45Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 145,
    repository: "artemest-vtools-front",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU0NTA3ODYz"
  },
  {
    title: "Initial setup",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-11-08T10:00:57Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 1,
    repository: "porsche-oneday-fe",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzM4NTk5NTg4"
  },
  {
    title: "Create README.md",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-11-04T13:15:49Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 2,
    repository: "ksh-boilerplate",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzM2MjcwOTU1"
  }
];

export const mockData = [
  {
    title: "[AR -1274] fix layout aaaa",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-27T10:33:52Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 152,
    repository: "artemest-vtools-front",
    requestedReviewers: ["jonny22094"],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU3MTk1MTI1"
  },
  {
    title: "[AR-1424] Merchandising rework aaa",
    closed: true,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-20T09:00:45Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 151,
    repository: "artemest-vtools-front",
    requestedReviewers: ["jonny22094"],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU1NjI1MDY5"
  },
  {
    title: "fix cookie not removing on logout aaa",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-19T14:43:59Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 149,
    repository: "artemest-vtools-front",
    requestedReviewers: ["wooojek"],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU1MTgwNTcw"
  },
  {
    title: "[AR-1361] Removed hard coded data DataTypes",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-19T10:46:12Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 148,
    repository: "artemest-vtools-front",
    requestedReviewers: ["jonny22094"],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU1MDc2NTM0"
  },
  {
    title: "[ AR - 1300 ] Connecting Vendor Export View UI with backend",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-19T09:49:40Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 147,
    repository: "artemest-vtools-front",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU1MDQ4MDQ2"
  },
  {
    title: "[ AR - 1115 ] Show approving  controls only to approver",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-18T12:47:40Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 146,
    repository: "artemest-vtools-front",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU0NTk1ODE3"
  },
  {
    title: "[AR - 1283] display all colections of vendor with their SKUs",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-12-18T09:17:45Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 145,
    repository: "artemest-vtools-front",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzU0NTA3ODYz"
  },
  {
    title: "Initial setup",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-11-08T10:00:57Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 1,
    repository: "porsche-oneday-fe",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzM4NTk5NTg4"
  },
  {
    title: "Create README.md",
    closed: false,
    author: "ksyhoo",
    labels: {},
    createdAt: "2019-11-04T13:15:49Z",
    updatedAt: "2019-12-27T10:33:52Z",
    number: 2,
    repository: "ksh-boilerplate",
    requestedReviewers: [],
    hasChanged: false,
    id: "MDExOlB1bGxSZXF1ZXN0MzM2MjcwOTU1"
  }
];
