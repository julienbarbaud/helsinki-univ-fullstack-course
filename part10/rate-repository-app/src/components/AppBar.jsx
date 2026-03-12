import Constants from "expo-constants";
import { View, ScrollView } from "react-native";
import theme from "../theme";
import Tab from "./Tab";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { USER_QUERY } from "../graphql/queries";
import useAuthStore from "../hooks/useAuthStore";

const AppBar = () => {
  const { data } = useQuery(USER_QUERY);
  const authStorage = useAuthStore();
  const apolloClient = useApolloClient();

  const styles = {
    bar: {
      paddingTop: Constants.statusBarHeight,
      paddingHorizontal: 15,
      paddingBottom: 7,
      backgroundColor: theme.colors.primaryDark,
    },
    tabContainer: {
      display: "flexbox",
      flexDirection: "row",
      gap: 10,
    },
  };

  const logout = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.bar} testID="status-bar">
      <ScrollView
        horizontal
        contentContainerStyle={styles.tabContainer}
        testID="status-scrollView"
      >
        <Tab key="repositories" path="/" text="Repositories" />
        {data?.me ? (
          <Tab key="logout" callback={logout} text="Logout" />
        ) : (
          <Tab key="login" path="/login" text="Login" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
