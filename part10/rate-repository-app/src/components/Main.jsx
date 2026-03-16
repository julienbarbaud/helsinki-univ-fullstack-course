import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import { Route, Routes } from "react-router-native";
import LoginView from "./LoginView";
import SingleRepository from "./SingleRepository";
import PostReview from "./PostReview";
import SignUp from "./SignUp";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: 10,
  },
  title: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

const Main = () => {
  console.log("launched");
  return (
    <View style={styles.rootContainer}>
      <AppBar />
      <View style={styles.contentContainer}>
        <Routes>
          <Route path="/" Component={RepositoryList} />
          <Route path="/login" Component={LoginView} />
          <Route path="/repository/:id" Component={SingleRepository} />
          <Route path="post_review" Component={PostReview} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/my_reviews" Component={MyReviews} />
        </Routes>
      </View>
    </View>
  );
};

export default Main;
