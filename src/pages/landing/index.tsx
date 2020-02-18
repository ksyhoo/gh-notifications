import React, { useEffect, useState } from "react";
import PullRequests from "components/pull-requests";
import ToolBar from "components/tool-bar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPullRequests,
  // checkForUpdates,
  checkForUpdatesInStore
} from "store/pullRequests";
import { State, PullRequestsState, PullRequest } from "utils/types";
import { Container } from "components/styled";
import store from "store";
import watch from "redux-watch";

const Landing: React.SFC = () => {
  const [data, setData] = useState<PullRequest[]>([]);

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
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch, state]);

  useEffect(() => {
    if (pullRequestsOfUserTypeFilter === "author") {
      setData(state.createdPullRequests);
    } else {
      setData(state.reviewRequestedPullRequests);
    }
  }, [
    pullRequestsOfUserTypeFilter,
    state.createdPullRequests,
    state.reviewRequestedPullRequests
  ]);

  // let w = watch(store.getState, "pullRequests.reviewRequestedPullRequests");
  // store.subscribe(
  //   w((newVal, oldVal, objectPath) => {
  //     console.log("%s changed from %s to %s", objectPath, oldVal, newVal);
  //   })
  // );

  // console.log(state);

  const subscriberFunc = (pullRequest?: any): boolean => {
    let s;
    let w = watch(store.getState, "pullRequests.createdPullRequests[0].title");
    store.subscribe(
      w((newVal, oldVal, objectPath) => {
        console.log("%s changed from %s to %s", objectPath, oldVal, newVal);
        if (oldVal === newVal) {
          s = false;
        }
        s = true;
      })
    );
    return s;
  };

  if (isLoading || error) {
    return <p>loading mutha fucka</p>;
  }

  return (
    <Container>
      <ToolBar />
      {data.map((item: PullRequest) => (
        <PullRequests
          key={item.id}
          data={item}
          shouldItemUpdate={subscriberFunc(item)}
        />
      ))}
    </Container>
  );
};

export default Landing;
