import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import Constants from "expo-constants";
import AuthStorage from "./authStorage";

loadDevMessages();
loadErrorMessages();

const createApolloClient = () => {
  const authStorage = new AuthStorage();

  const authLink = setContext(async ({ headers }) => {
    const token = await authStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const gqlLink = new HttpLink({
    uri: `${Constants.expoConfig.extra.SERVER_URL}:4000/graphql`,
  });

  console.log("gql uri: ", gqlLink.options.uri);

  return new ApolloClient({
    link: authLink.concat(gqlLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
