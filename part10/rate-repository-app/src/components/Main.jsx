import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import theme from "../theme";
import { Route, Routes } from "react-router-native";
import LoginView from "./LoginView";

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
        </Routes>
      </View>
    </View>
  );
};

export default Main;
