import React from "react";
import moment from "moment";
import Octicon, { GitPullRequest } from "@primer/octicons-react";
import { Wrapper, Text, Item } from "./pull-requests.styled";
import { PullRequest } from "utils/types";
import TextWitchWatcher from "components/text-with-watcher";

interface Props {
  data: PullRequest;
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
    <Wrapper updated={shouldItemUpdate}>
      <Item>
        <Octicon icon={GitPullRequest} />
        <Text>{data.repository}</Text>
      </Item>
      <TextWitchWatcher path={`${data.id}.title`} value={data.title} />
      <Item>
        <Text>PR#{data.number}</Text>
        <Text>opened:{moment(data.createdAt).format("MMMM Do YYYY")}</Text>
      </Item>
      <Item>
        <Text>author:{data.author}</Text>
        <TextWitchWatcher
          path={`${data.id}.closed`}
          value={data.closed ? "closed" : "open"}
        />
      </Item>
    </Wrapper>
  );
};
