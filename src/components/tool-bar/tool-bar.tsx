import React from "react";
import { setPullRequestFilter } from "store/pullRequestFilter";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper, Selection, Button, Notification } from "./tool-bar.styled";
import { State } from "utils/types";
import { userRole, reviewStatus } from "utils/constants";

interface Props {
  author?: number;
  reviewer?: number;
  authorNew?: number;
  reviewerNew?: number;
}

const ToolBar: React.SFC<Props> = ({
  author,
  reviewer,
  authorNew,
  reviewerNew
}) => {
  const dispatch = useDispatch();

  const setFilter = (filter: string) => {
    dispatch(setPullRequestFilter(filter));
  };

  const pullRequestsOfUserTypeFilter: string = useSelector(
    (rootState: State) => rootState.pullRequestFilter.userInvolvementType
  );

  return (
    <Wrapper>
      <Selection selected={pullRequestsOfUserTypeFilter === userRole.author}>
        <div style={{ display: "flex", position: "relative" }}>
          <Button onClick={() => setFilter(userRole.author)}>
            CREATED {author}
          </Button>
          <Notification status={reviewStatus.accepted}>
            {authorNew}
          </Notification>
        </div>
      </Selection>
      <Selection selected={pullRequestsOfUserTypeFilter === userRole.reviewer}>
        <div style={{ display: "flex", position: "relative" }}>
          <Button onClick={() => setFilter(userRole.reviewer)}>
            REVIEW REQUESTED {reviewer}
          </Button>
          <Notification status={reviewStatus.accepted}>
            {reviewerNew}
          </Notification>
        </div>
      </Selection>
    </Wrapper>
  );
};

export default ToolBar;
