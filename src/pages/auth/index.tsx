import React, { useEffect } from "react";
import { default as Octokit } from "@octokit/rest";

const Auth: React.FC = () => {
  const clientWithAuth = new Octokit({
    auth: "acc25aa87f80157842a4f41921f144ba98052fdd"
  });
  useEffect(() => {
    async function fetchData() {
      // const a = await octokit.repos.get({
      //   owner: "octokit",
      //   repo: "rest.js"
      // });
      // const { data } = await clientWithAuth.activity.listNotifications({
      //   all: true
      // });
      // const b = await clientWithAuth.pulls.list({
      //   owner: "ksyhoo",
      //   repo: "ksh-boilerplate"
      // });

      // issues asigned to user(pull and other)
      // const c = await clientWithAuth.issues.listForAuthenticatedUser();

      // // issues created by user
      // const d = await clientWithAuth.issues.listForAuthenticatedUser({
      //   filter: "all"
      // });

      return null;
    }
    fetchData();
  }, [clientWithAuth.activity, clientWithAuth.issues, clientWithAuth.pulls]);

  const handleLogin = () => {
    return null;
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Auth;
