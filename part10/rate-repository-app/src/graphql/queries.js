import { gql } from "@apollo/client";

export const REPOSITORIES_QUERY = gql`
  query Query {
    repositories {
      edges {
        node {
          fullName
          ownerAvatarUrl
          ratingAverage
          reviewCount
          forksCount
          stargazersCount
          description
          language
          id
        }
      }
    }
  }
`;

export const USER_QUERY = gql`
  query {
    me {
      username
    }
  }
`;
