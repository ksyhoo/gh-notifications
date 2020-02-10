import React, { useState, useEffect } from "react";
import moment from "moment";
import Octicon, { GitPullRequest } from "@primer/octicons-react";
import { Wrapper, Details, Description, Text } from "./pull-requests.styled";
import { PullRequest, State } from "utils/types";
import { useSelector } from "react-redux";

interface Props {
  data?: PullRequest[];
  userType?: string;
}

export const PullRequests: React.FC<Props> = ({ userType }) => {
  const [displayData, setDisplayData] = useState<PullRequest[]>([]);
  const pullRequests = useSelector(
    (rootState: State) => rootState.pullRequests
  );
  useEffect(() => {
    const data =
      userType === "author"
        ? pullRequests.createdPullRequests
        : pullRequests.reviewRequestedPullRequests;
    setDisplayData(data);
  }, [pullRequests, userType]);
  if (!displayData) {
    return <Wrapper>PR's not found</Wrapper>;
  }
  return (
    <>
      {displayData.map((item: PullRequest) => (
        <Wrapper key={item.createdAt}>
          <Description>
            <div>
              <Octicon icon={GitPullRequest} />
              {item.repository}
            </div>
            <span>{item.title}</span>
          </Description>
          <Details>
            <>
              <Text>#{item.number}</Text>
              <Text>
                <span>opened:</span>{" "}
                {moment(item.createdAt).format("MMMM Do YYYY")}
              </Text>
            </>
            <>
              <Text>
                <span>by:</span> {item.author}
              </Text>
              <Text>
                <span>status:</span> {item.closed ? "closed" : "open"}
              </Text>
            </>
          </Details>
        </Wrapper>
      ))}
    </>
  );
};
