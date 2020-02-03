import React from "react";
import { Issue } from "utils/types";
import moment from "moment";
import Octicon, { GitPullRequest } from "@primer/octicons-react";
import {
  Wrapper,
  Title,
  Details,
  Description,
  Text
} from "./pull-request.styled";

interface Props {
  pullRequests: Issue[];
}

export const PullRequest: React.FC<Props> = ({ pullRequests }) => {
  if (!pullRequests) {
    return <Wrapper>PR's not found</Wrapper>;
  }
  return (
    <>
      {pullRequests.map((item: Issue) => (
        <Wrapper key={item.createdAt}>
          <Description>
            <Octicon icon={GitPullRequest} />
            <Title>
              <span>{item.repository}</span>
              {item.title}
            </Title>
          </Description>
          <Details>
            <Text>#{item.number}</Text>
            <Text>
              <span>opened:</span>{" "}
              {moment(item.createdAt).format("MMMM Do YYYY")}
            </Text>
            <Text>
              <span>by:</span> {item.user.name}
            </Text>
            <Text>
              <span>status:</span> {item.state}
            </Text>
          </Details>
        </Wrapper>
      ))}
    </>
  );
};
