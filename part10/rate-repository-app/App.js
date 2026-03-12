import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client/react";
import createApolloClient from "./src/apollo";
import AuthStorage, { authStorageContext } from "./src/authStorage";

const apolloClient = createApolloClient();

const App = () => {
  return (
    <NativeRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true, // It's usually good to opt-in to this one too
      }}
    >
      <ApolloProvider client={apolloClient}>
        <authStorageContext.Provider value={new AuthStorage()}>
          <Main />
        </authStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
