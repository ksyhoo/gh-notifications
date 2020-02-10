// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { searchPullRequestsGql, normalizeGqlResponse } from "utils/helpers";
// import { State, PullRequest } from "utils/types";
// import { GraphQlQueryResponseData } from "@octokit/graphql/dist-types/types";
// import {
//   setCreatedPullRequests,
//   setReviewRequestedPullRequests
// } from "store/pullRequests";
// import { Dispatch } from "@reduxjs/toolkit";

// const useLandingData = () => {
//   const dispatch = useDispatch();

//   const pullRequestsOfUserTypeFilter: string = useSelector(
//     (rootState: State) => rootState.pullRequestFilter.userInvolvementType
//   );

//   const [response, setResponse] = useState<PullRequest[] | null>([]);
//   useEffect(() => {
//     (async () => {
//       const data: GraphQlQueryResponseData = await searchPullRequestsGql(
//         pullRequestsOfUserTypeFilter
//       );
//       setResponse(data && normalizeGqlResponse(data.search.edges));
//       addPullRequests(data, dispatch);
//     })();
//   }, [dispatch, pullRequestsOfUserTypeFilter]);

//   useEffect(() => {
//     let interval: number;
//     async function fetchData() {
//       interval = setInterval(async () => {
//         const data: GraphQlQueryResponseData = await searchPullRequestsGql(
//           pullRequestsOfUserTypeFilter
//         );
//         setResponse(data && normalizeGqlResponse(data.search.edges));
//       }, 2000);
//     }
//     fetchData();
//     return () => clearInterval(interval);
//   }, [pullRequestsOfUserTypeFilter, response]);

//   return response;
// };

// function getAuthorPullRequests(data: any): [PullRequest] {
//   let pullRequests;
//   if (data) {
//     pullRequests = data.search.edges;
//   }
//   const authorPullRequests = pullRequests.filter(
//     ({ node }: any) => node.author.login === "ksyhoo"
//   );

//   return authorPullRequests;
// }
// function getToReviewPullRequests(data: any): [PullRequest] {
//   let pullRequests;
//   if (data) {
//     pullRequests = data.search.edges;
//   }
//   const toReviewPullRequests = pullRequests.filter(({ node }: any) =>
//     node.reviewRequests.edges.find(
//       ({ node }: any) => node.requestedReviewer.login === "jonny22094"
//     )
//   );

//   return toReviewPullRequests;
// }

// function addPullRequests(
//   data: GraphQlQueryResponseData | null,
//   dispatch: Dispatch
// ): void {
//   const authorPullRequests = getAuthorPullRequests(data);
//   const toReviewPullRequests = getToReviewPullRequests(data);
//   if (authorPullRequests) {
//     dispatch(setCreatedPullRequests(normalizeGqlResponse(authorPullRequests)));
//   }
//   if (toReviewPullRequests) {
//     dispatch(
//       setReviewRequestedPullRequests(normalizeGqlResponse(toReviewPullRequests))
//     );
//   }
// }

// // async function checkForUpdates(
// //   data: GraphQlQueryResponseData | null,
// //   dispatch: Dispatch,
// //   rootState: State
// // ) {}

// export default useLandingData;
