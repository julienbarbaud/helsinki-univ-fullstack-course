import Constants from "expo-constants";
import { View, ScrollView } from "react-native";
import theme from "../theme";
import Tab from "./Tab";
import { useApolloClient, useQuery } from "@apollo/client/react";
import { USER_QUERY } from "../graphql/queries";
import useAuthStore from "../hooks/useAuthStore";
import { useNavigate } from "react-router-native";

const AppBar = () => {
  const { data } = useQuery(USER_QUERY);
  const authStorage = useAuthStore();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const styles = {
    bar: {
      paddingTop: Constants.statusBarHeight,
      paddingLeft: 20,
      paddingBottom: 7,
      backgroundColor: theme.colors.primaryDark,
    },
    tabContainer: {
      display: "flexbox",
      flexDirection: "row",
      gap: 30,
    },
  };

  const logout = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
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
          <>
            <Tab key="post_review" path="/post_review" text="Post review" />
            <Tab key="my_reviews" path="/my_reviews" text="My reviews" />
            <Tab key="logout" callback={logout} text="Logout" />
          </>
        ) : (
          <>
            <Tab key="login" path="/login" text="Login" />
            <Tab key="sign up" path="/signup" text="Sign up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
