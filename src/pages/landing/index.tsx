import React, { useEffect, useState } from "react";
import PullRequests from "components/pull-requests";
import ToolBar from "components/tool-bar";
import { useSelector, useDispatch } from "react-redux";
import { fetchPullRequests, checkForUpdatesInStore } from "store/pullRequests";
import { State, PullRequestsState, PullRequest } from "utils/types";
import { Container } from "components/styled";
import { castToArray, getAuthorPRs, getReviewerPRs } from "utils/helpers";
import { userRole } from "utils/constants";

const Landing: React.FC = () => {
  const [data, setData] = useState<PullRequest[]>([]);
  const [authorPRCount, setAuthorPRCount] = useState<number>(0);
  const [newAuthorPRCount, setNewAuthorPRCount] = useState<number>(0);
  const [reviewerPRCount, setReviewerPRCount] = useState<number>(0);
  const [newReviewerPRCount, setNewReviewerPRCount] = useState<number>(0);

  const dispatch = useDispatch();

  const pullRequestsOfUserTypeFilter: string = useSelector(
    (rootState: State) => rootState.pullRequestFilter.userInvolvementType
  );

  const isLoading: boolean = useSelector(
    (rootState: State) => rootState.pullRequests.isLoading
  );

  const error: string | null = useSelector(
    (rootState: State) => rootState.pullRequests.error
  );

  const state: PullRequestsState = useSelector(
    (rootState: State) => rootState.pullRequests
  );

  useEffect(() => {
    dispatch(fetchPullRequests());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkForUpdatesInStore());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, state]);

  useEffect(() => {
    const pullRequestArray = castToArray(state.items);
    const authorPR = getAuthorPRs(pullRequestArray);
    const reviewerPR = getReviewerPRs(pullRequestArray);

    setAuthorPRCount(authorPR.length);
    setNewAuthorPRCount(authorPR.filter(({ hasChanged }) => hasChanged).length);
    setReviewerPRCount(reviewerPR.length);
    setNewReviewerPRCount(
      reviewerPR.filter(({ hasChanged }) => hasChanged).length
    );

    if (pullRequestsOfUserTypeFilter === userRole.author) {
      setData(authorPR);
    } else {
      setData(reviewerPR);
    }
  }, [pullRequestsOfUserTypeFilter, state.items]);

  if (isLoading || error) {
    return <p>loading mutha fucka</p>;
  }

  return (
    <Container>
      <ToolBar
        author={authorPRCount}
        reviewer={reviewerPRCount}
        authorNew={newAuthorPRCount}
        reviewerNew={newReviewerPRCount}
      />
      {data
        .sort((a, b) =>
          a.updatedAt.valueOf() < b.updatedAt.valueOf() ? 1 : -1
        )
        .sort((a, b) => (a.hasChanged === b.hasChanged ? 1 : -1))
        .map((item: PullRequest) => (
          <PullRequests
            key={item.id}
            data={item}
            shouldItemUpdate={item.hasChanged}
          />
        ))}
    </Container>
  );
};

export default Landing;
