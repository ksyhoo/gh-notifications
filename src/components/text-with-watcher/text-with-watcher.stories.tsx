import TextWithWatcher from ".";
import React from "react";

export default {
  component: TextWithWatcher,
  title: "Text With Watcher"
};

export const Default = () => {
  return <TextWithWatcher value={"test value"} />;
};
