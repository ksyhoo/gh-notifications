import { default as Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: "df784804697d546df9282ecf9abc9009ae721771"
});

export default octokit;
