import React from "react";
import useLandingData from "./use-landing-data";
import PullRequest from "../../components/pull-request";
import ToolBar from "../../components/tool-bar";

const Landing: React.FC = () => {
  const pulls = useLandingData();

  if (!pulls) {
    return <p>loading mutha fucka</p>;
  }
  return (
    <>
      <ToolBar />
      <p>Personal / Organization / All </p>
      <p>Assigned to me / Created by me </p>
      <PullRequest pullRequests={pulls} />
    </>
  );
};

export default Landing;
