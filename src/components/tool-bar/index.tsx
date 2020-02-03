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
      {/* <button onClick={() => setFilter("all")}>ALL</button> */}
      <button onClick={() => setFilter("author")}>CREATED BY ME</button>
      <button onClick={() => setFilter("assignee")}>ASSIGNED TO ME</button>
    </div>
  );
};

export default ToolBar;
