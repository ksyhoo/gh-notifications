import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { normalize, getPullRequests } from "../../utils/helpers";

const useLandingData = () => {
  const state = useSelector(
    (state: any) => state.pullRequestFilter.showPullRequests
  );

  console.log(state);

  const [response, setResponse] = useState<any>([]);
  // const [timer, setTimer] = useState<number>(60000);
  useEffect(() => {
    (async () => {
      const search = await getPullRequests(state);
      setResponse(normalize(search.data.items));
    })();
  }, [state]);
  return response;
};

export default useLandingData;
