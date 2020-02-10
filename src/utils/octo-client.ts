import { graphql } from "@octokit/graphql";

export const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_PERSONAL_TOKEN}`
  }
});
