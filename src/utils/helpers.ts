import { graphqlWithAuth } from "./octo-client";
import { GraphQlQueryResponseData } from "@octokit/graphql/dist-types/types";

export const sortByNewestModified = (data) =>
  data.sort((a, b) => (a.updatedAt.valueOf() < b.updatedAt.valueOf() ? 1 : -1));

export const sortByHasChanged = (data) =>
  data.sort((a, b) => (a.hasChanged === b.hasChanged ? 1 : -1));

export const getAuthorPRs = (pullRequestArray) =>
  pullRequestArray.filter(({ author }) => author === "ksyhoo");

export const getReviewerPRs = (pullRequestArray) =>
  pullRequestArray.filter(({ requestedReviewers }) =>
    requestedReviewers.includes("jonny22094")
  );

export const castToArray = (pullRequestObject) => {
  return Object.keys(pullRequestObject).map(
    (pullRequestKey) => pullRequestObject[pullRequestKey]
  );
};

export const normalizeGqlResponseToObject = (data: Array<any>, key: string) => {
  const initialValue = {};
  return data.reduce((obj, item) => {
    return {
      ...obj,
      [item.node[key]]: {
        ...item.node,
        requestedReviewers: item.node.reviewRequests.edges.map(
          ({ node }) => node.requestedReviewer.login
        ),

        author: item.node.author.login,
        // labels: item.node.labels.edges.map(({ node }) => node),
        labels: { ...item.node.labels.edges.node },
        repository: item.node.headRepository.name
      }
    };
  }, initialValue);
};

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

export const mockData = [
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzU3MTk1MTI1",
      number: 152,
      url: "https://github.com/netguru/artemest-vtools-front/pull/152",
      title: "[AR -1274] fix layout UPDATE",
      createdAt: "2019-12-27T10:33:52Z",
      updatedAt: "2020-02-05T10:07:06Z",
      closed: false,
      reviewRequests: {
        edges: [
          {
            node: {
              __typename: "ReviewRequest",
              id: "MDEzOlJldmlld1JlcXVlc3QxNjcxNTY4OTg=",
              requestedReviewer: {
                __typename: "User",
                login: "jonny22094"
              }
            }
          }
        ]
      },
      author: { __typename: "User", login: "asd" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "artemest-vtools-front"
      }
    }
  },
  {
    node: {
      id: "a",
      number: 152222222,
      url: "https://github.com/netguru/artemest-vtools-front/pull/152",
      title: "[AR -1274] fix layout UPDATE 323232dadsadasdsadsadas",
      createdAt: "2019-12-27T10:33:52Z",
      updatedAt: "2020-02-05T10:07:06Z",
      closed: false,
      reviewRequests: {
        edges: [
          {
            node: {
              __typename: "ReviewRequest",
              id: "MDEzOlJldmlld1JlcXVlc3QxNjcxNTY4OTg=",
              requestedReviewer: {
                __typename: "User",
                login: "jonny22094"
              }
            }
          }
        ]
      },
      author: { __typename: "User", login: "asd" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "artemest-vtools-front"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzU1NjI1MDY5",
      number: 151,
      url: "https://github.com/netguru/artemest-vtools-front/pull/151",
      title: "[AR-1424] Merchandising rework UPDATE",
      createdAt: "2019-12-20T09:00:45Z",
      updatedAt: "2019-12-20T09:00:49Z",
      closed: false,
      reviewRequests: {
        edges: [
          {
            node: {
              __typename: "ReviewRequest",
              id: "MDEzOlJldmlld1JlcXVlc3QxNjcxNTY4OTg=",
              requestedReviewer: {
                __typename: "User",
                login: "jonny22094"
              }
            }
          }
        ]
      },
      author: { __typename: "User", login: "asd" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "artemest-vtools-front"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzU1MTgwNTcw",
      number: 149,
      url: "https://github.com/netguru/artemest-vtools-front/pull/149",
      title: "fix cookie not removing on logout",
      createdAt: "2019-12-19T14:43:59Z",
      updatedAt: "2019-12-19T14:53:16Z",
      closed: true,
      reviewRequests: {
        edges: [
          {
            node: {
              __typename: "ReviewRequest",
              id: "MDEzOlJldmlld1JlcXVlc3QxNTU0MjkzMDM=",
              requestedReviewer: { __typename: "User", login: "wooojek" }
            }
          }
        ]
      },
      author: { __typename: "User", login: "ksyhoo" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "artemest-vtools-front"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzU1MDc2NTM0",
      number: 148,
      url: "https://github.com/netguru/artemest-vtools-front/pull/148",
      title: "[AR-1361] Removed hard coded data DataTypes",
      createdAt: "2019-12-19T10:46:12Z",
      updatedAt: "2019-12-19T10:46:12Z",
      closed: true,
      reviewRequests: { edges: [] },
      author: { __typename: "User", login: "ksyhoo" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "artemest-vtools-front"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzU1MDQ4MDQ2",
      number: 147,
      url: "https://github.com/netguru/artemest-vtools-front/pull/147",
      title: "[ AR - 1300 ] Connecting Vendor Export View UI with backend",
      createdAt: "2019-12-19T09:49:40Z",
      updatedAt: "2019-12-19T09:49:40Z",
      closed: false,
      reviewRequests: { edges: [] },
      author: { __typename: "User", login: "ksyhoo" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "artemest-vtools-front"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzU0NTk1ODE3",
      number: 146,
      url: "https://github.com/netguru/artemest-vtools-front/pull/146",
      title: "[ AR - 1115 ] Show approving  controls only to approver",
      createdAt: "2019-12-18T12:47:40Z",
      updatedAt: "2019-12-18T12:47:40Z",
      closed: false,
      reviewRequests: { edges: [] },
      author: { __typename: "User", login: "ksyhoo" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "artemest-vtools-front"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzU0NTA3ODYz",
      number: 145,
      url: "https://github.com/netguru/artemest-vtools-front/pull/145",
      title: "[AR - 1283] display all colections of vendor with their SKUs",
      createdAt: "2019-12-18T09:17:45Z",
      updatedAt: "2019-12-18T09:30:19Z",
      closed: false,
      reviewRequests: { edges: [] },
      author: { __typename: "User", login: "ksyhoo" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "artemest-vtools-front"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzM4NTk5NTg4",
      number: 212,
      url: "https://github.com/netguru/porsche-oneday-fe/pull/1",
      title: "Initial setup aaa",
      createdAt: "2019-11-08T10:00:57Z",
      updatedAt: "2019-11-08T14:53:09Z",
      closed: false,
      reviewRequests: { edges: [] },
      author: { __typename: "User", login: "ksyhoo" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "porsche-oneday-fe"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzM2MjcwOTU1",
      number: 2,
      url: "https://github.com/ksyhoo/ksh-boilerplate/pull/2",
      title: "Create README.md",
      createdAt: "2019-11-04T13:15:49Z",
      updatedAt: "2019-11-18T12:56:20Z",
      closed: false,
      reviewRequests: { edges: [] },
      author: { __typename: "User", login: "ksyhoo" },
      labels: { edges: [] },
      headRepository: {
        __typename: "Repository",
        name: "ksh-boilerplate"
      }
    }
  },
  {
    node: {
      id: "MDExOlB1bGxSZXF1ZXN0MzM0NTcyOTAz",
      number: 1,
      url: "https://github.com/ksyhoo/react-portfolio/pull/1",
      title: "chore(deps): bump mixin-deep from 1.3.1 to 1.3.2",
      createdAt: "2019-10-30T23:44:23Z",
      updatedAt: "2019-11-04T13:01:00Z",
      closed: false,
      reviewRequests: { edges: [] },
      author: {},
      labels: {
        edges: [
          {
            node: {
              __typename: "Label",
              name: "dependencies",
              id: "MDU6TGFiZWwxNjQ4NDY2OTEw"
            }
          }
        ]
      },
      headRepository: {
        __typename: "Repository",
        name: "react-portfolio"
      }
    }
  }
];
