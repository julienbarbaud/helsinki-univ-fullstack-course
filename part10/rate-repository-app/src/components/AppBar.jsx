import Constants from "expo-constants";
import { View, ScrollView } from "react-native";
import theme from "../theme";
import Tab from "./Tab";

const AppBar = () => {
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

  return (
    <View style={styles.bar}>
      <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
        <Tab path="/" text="Repositories" />
        <Tab path="/login" text="Login" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
