import React from "react";
import ToolBar from "./tool-bar";

export default {
  component: ToolBar,
  title: "Tool Bar"
};

const author = 1;
const reviewer = 2;
const authorNew = 100;
const reviewerNew = 12;

export const Default = () => {
  return (
    <ToolBar
      author={author}
      reviewer={reviewer}
      authorNew={authorNew}
      reviewerNew={reviewerNew}
    />
  );
};
