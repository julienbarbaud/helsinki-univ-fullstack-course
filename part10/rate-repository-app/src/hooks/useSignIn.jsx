import { useApolloClient, useMutation } from "@apollo/client/react";
import { SIGN_IN_MUTATION } from "../graphql/mutations";
import useAuthStore from "./useAuthStore";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const [authenticate, result] = useMutation(SIGN_IN_MUTATION);
  const navigate = useNavigate("/");
  const apolloClient = useApolloClient();
  const authStore = useAuthStore();
  return [
    async (credentials) => {
      const result = await authenticate({ variables: credentials });
      authStore.setAccessToken(result.data.authenticate.accessToken);
      navigate("/");
      apolloClient.resetStore();
      return result;
    },
    result,
  ];
};

export default useSignIn;
