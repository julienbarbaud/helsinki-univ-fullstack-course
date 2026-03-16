import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import Constants from "expo-constants";
import AuthStorage from "./authStorage";
import { relayStylePagination } from "@apollo/client/utilities";
import { memo } from "react";

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

  // This is paramount so that queries get properly updated without custom fetch policies:
  const repositoriesArguments = ["orderBy", "orderDirection", "searchKeyword"];

  const memoryCache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination(repositoriesArguments),
        },
      },
      Repository: {
        fields: {
          reviews: relayStylePagination(),
        },
      },
    },
  });

  return new ApolloClient({
    link: authLink.concat(gqlLink),
    cache: memoryCache,
  });
};

export default createApolloClient;
