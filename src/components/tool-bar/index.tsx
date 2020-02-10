import React from "react";
import { setPullRequestFilter } from "store/pullRequestFilter";
import { useDispatch } from "react-redux";

interface Props {}

const ToolBar: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const setFilter = (filter: string) => {
    dispatch(setPullRequestFilter(filter));
  };

  return (
    <div>
      <button onClick={() => setFilter("author")}>CREATED</button>
      {/* <button onClick={() => setFilter("assignee")}>ASSIGNED</button>
      <button onClick={() => setFilter("involves")}>MENTIONED</button> */}
      <button onClick={() => setFilter("review-requested")}>
        REVIEW REQUESTED
      </button>
    </div>
  );
};

export default ToolBar;
