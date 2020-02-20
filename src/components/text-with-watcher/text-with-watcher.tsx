import React, { ReactElement } from "react";
import withWatcher from "components/with-watcher-hoc";
import { Text } from "./text-with-watcher.styled";

interface Props {
  value?: string;
  updated?: boolean;
}

const TextWithWatcher = ({ value, updated }): ReactElement<Props> => {
  // const Test = ({ value }): React.FC<{ value?: string | undefined }> => {
  return <Text updated={updated}>{value}</Text>;
};
export default withWatcher(TextWithWatcher);
