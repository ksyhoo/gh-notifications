import React, { useState, useEffect } from "react";
import store from "store";
import watch from "redux-watch";

export interface withWatcherProps {
  path?: string;
  value?: string;
}

export const withWatcher = (
  Component: React.ComponentType<any>
): React.FC<withWatcherProps> => ({ path, value }) => {
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);

  const w = watch(store.getState, `pullRequests.items.${path}`);
  const unsubscribe = store.subscribe(
    w((newVal: string, oldVal: string, objectPath: string) => {
      console.log("%s changed from %s to %s", objectPath, oldVal, newVal);
      if (oldVal === newVal) {
        setShouldUpdate(false);
      }
      setShouldUpdate(true);
    })
  );

  useEffect(() => {
    if (!path) {
      unsubscribe();
    }
    return () => unsubscribe();
  }, [path, shouldUpdate, unsubscribe]);

  return <Component value={value} updated={shouldUpdate} />;
};
