import { gql } from "@apollo/client";

const repoInfoFragment = gql`
  fragment repoInfo on Repository {
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
`;

const reviewInfoFragment = gql`
  fragment reviewInfo on ReviewConnection {
    edges {
      node {
        id
        text
        rating
        createdAt
        user {
          username
        }
        repository {
          fullName
          id
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
      startCursor
    }
  }
`;

export const REPOSITORIES_QUERY = gql`
  query Query(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...repoInfo
        }
        cursor
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
  }
  ${repoInfoFragment}
`;

export const USER_QUERY = gql`
  query ($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        ...reviewInfo
      }
    }
  }
  ${reviewInfoFragment}
`;

export const REPOSITORY_QUERY = gql`
  query Query($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...repoInfo
      url
      reviews(first: $first, after: $after) {
        ...reviewInfo
      }
    }
  }
  ${repoInfoFragment}
  ${reviewInfoFragment}
`;
