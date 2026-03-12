import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation signIn($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;
