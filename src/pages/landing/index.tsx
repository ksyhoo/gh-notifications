import React, { useEffect } from "react";
import PullRequests from "components/pull-requests";
import ToolBar from "components/tool-bar";
import { useSelector, useDispatch } from "react-redux";
import { fetchPullRequestsThunk, checkForUpdates } from "store/pullRequests";
import { State, PullRequestsState } from "utils/types";

const Landing: React.FC = () => {
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
    dispatch(fetchPullRequestsThunk(pullRequestsOfUserTypeFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let interval: number;
    interval = setInterval(async () => {
      dispatch(checkForUpdates(pullRequestsOfUserTypeFilter, state));
    }, 2000000);

    return () => clearInterval(interval);
  }, [dispatch, pullRequestsOfUserTypeFilter, state]);

  if (isLoading || error) {
    return <p>loading mutha fucka</p>;
  }

  return (
    <>
      <ToolBar />
      <PullRequests userType={pullRequestsOfUserTypeFilter} />
    </>
  );
};

export default Landing;
