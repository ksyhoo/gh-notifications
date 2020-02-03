import { SearchIssuesAndPullRequestsResponseItemsItem } from "@octokit/rest";
import octokit from "./octo-client";

export const repositoryNameFromUrl = (url: string): string =>
  url.slice(url.lastIndexOf("repos/") + 6);

export const repositoryOwnerFromUrl = (url: string): string =>
  url.slice(url.lastIndexOf("repos/") + 6, url.lastIndexOf("/"));

export const repositoryShortNameFromUrl = (url: string): string =>
  url.slice(url.lastIndexOf("/") + 1);

export const normalize = (
  data: SearchIssuesAndPullRequestsResponseItemsItem[]
) =>
  data.map((item: SearchIssuesAndPullRequestsResponseItemsItem) => ({
    title: item.title,
    user: { name: item.user.login },
    repositoryLongName: repositoryNameFromUrl(item.repository_url),
    labels: { ...item.labels },
    assignee: item.assignee,
    assignees: [item.assignee],
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    state: item.state,
    number: item.number,
    owner: repositoryOwnerFromUrl(item.repository_url),
    repository: repositoryShortNameFromUrl(item.repository_url)
  }));

export const getPullRequests = async (state: string) => {
  return await octokit.search.issuesAndPullRequests({
    q: `${state}:ksyhoo+state:open+type:pr`
  });
};

export const getPullRequestsReviews = async (
  owner: string,
  repo: string,
  pull_number: number
) => {
  return await octokit.pulls.listReviewRequests({
    owner,
    repo,
    pull_number
  });
};

// function searchQuery(state: any) {
//   return `${state.showPullRequests}:ksyhoo+state:open+type:pr`;
// }

// const { data } = await octokit.issues.listForAuthenticatedUser({
//   filter: "all"
// });

// const pullRequests = data.filter((item) => item.pull_request);

// console.log(search.data.items[0].repository_url.match(reg));
// console.log(search.data.items[0].repository_url.slice(54));

// console.log(data);

// const events = await octokit.activity.listReceivedEventsForUser({
//   username: "ksyhoo"
// });
// console.log(events);

//FIXME: tutaj notyfikacje pod dzwoneczkiem na stronie
// const check = await octokit.activity.listNotifications();
// console.log(check);

//   const test = await octokit.pulls.list({
//     owner: "ksyhoo",
//     repo: "ksh-boilerplate"
//   });
//   const singlePull = await octokit.pulls.get({
//     owner: "ksyhoo",
//     repo: "ksh-boilerplate",
//     pull_number: 2
//   });
//   const userActivity = await octokit.activity.listEventsForUser({
//     username: "ksyhoo"
//   });
//   const receivedEvents = await octokit.activity.listReceivedEventsForUser({
//     username: "ksyhoo"
//   });
// const orgs = await octokit.orgs.listHooks({
//   org: "netguru"
// });

// const hooks = await octokit.repos.listHooks({
//   owner: "ksyhoo",
//   repo: "ksh-boilerplate"
// });
// const hooks = await octokit.repos.listHooks({
//   owner: "netguru",
//   repo: "KW-Offers"
// });
// const user = await octokit.users.getAuthenticated();

//FIXME: tutaj jest org
// const user = await octokit.users.getContextForUser({
//   username: "ksyhoo"
// });

// const orgsa = await octokit.orgs.listForUser({
//   username: "ksyhoo"
// });

// octokit.users.getAuthenticated()
// octokit.projects.listForUser({
//   username
// })
