import React from "react";
import moment from "moment";
import Octicon, { GitPullRequest } from "@primer/octicons-react";
import { Wrapper, Text, Item } from "./pull-requests.styled";
import { PullRequest } from "utils/types";
// import store from "store";

// import watch from "redux-watch";

interface Props {
  data?: PullRequest;
  userType?: string;
  shouldItemUpdate?: boolean;
}

export const PullRequests: React.SFC<Props> = ({
  data,
  shouldItemUpdate
}: Props) => {
  if (!data) {
    return <Wrapper>PR not found</Wrapper>;
  }

  return (
    <Wrapper>
      {shouldItemUpdate ? "tak" : "nie"}
      <Item>
        <Octicon icon={GitPullRequest} />
        <Text> {data.repository}</Text>
      </Item>
      <Text>{data.title}</Text>
      <Item>
        <Text>PR#{data.number}</Text>
        <Text>opened:{moment(data.createdAt).format("MMMM Do YYYY")}</Text>
      </Item>
      <Item>
        <Text>author:{data.author}</Text>
        <Text>status: {data.closed ? "closed" : "open"}</Text>
      </Item>
    </Wrapper>
  );
};
