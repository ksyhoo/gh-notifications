import { default as Octokit } from "@octokit/rest";
import { graphql } from "@octokit/graphql";

const octokit = new Octokit({
  auth: "df784804697d546df9282ecf9abc9009ae721771"
});

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `Bearer df784804697d546df9282ecf9abc9009ae721771`
  }
});

export default octokit;
