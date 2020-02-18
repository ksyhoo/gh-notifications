import React from "react";
import { setPullRequestFilter } from "store/pullRequestFilter";
import { useDispatch, useSelector } from "react-redux";
import NotificationBar from "components/notfication-bar";
import { State, PullRequest } from "utils/types";
import { Wrapper } from "./tool-bar.styled";
// import watch from "redux-watch";
// import store from "store";

interface Props {}

const ToolBar: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const setFilter = (filter: string) => {
    dispatch(setPullRequestFilter(filter));
  };

  const numberOfNotifications: number = useSelector(
    (rootState: State) =>
      rootState.pullRequests.reviewRequestedPullRequests.filter(
        ({ isNewReviewRequest }: PullRequest) => isNewReviewRequest
      ).length
  );
  // let w = watch(store.getState, "pullRequestFilter.userInvolvementType");
  // store.subscribe(
  //   w((newVal, oldVal, objectPath) => {
  //     console.log("%s changed from %s to %s", objectPath, oldVal, newVal);
  //   })
  // );

  return (
    <Wrapper>
      <button onClick={() => setFilter("author")}>CREATED</button>

      <Wrapper>
        <button onClick={() => setFilter("review-requested")}>
          REVIEW REQUESTED
        </button>
        {numberOfNotifications > 0 && (
          <NotificationBar
            status="ACCEPTED"
            numberOfNotifications={numberOfNotifications}
          />
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default ToolBar;
