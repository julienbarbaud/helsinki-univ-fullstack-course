import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation signIn($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const POST_REVIEW_MUTATION = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      repository {
        ownerName
        name
        id
      }
      rating
      createdAt
      text
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

export const DELETE_REVIEW_MUTATION = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
