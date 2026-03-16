import { StyleSheet, View } from "react-native";
import Text from "./Text";

const StatItem = ({ value, name }) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container} accessibilityLabel="statistics-item">
      <Text fontWeight="bold" fontSize="subheading">
        {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
      </Text>
      <Text color="subHeading">{name}</Text>
    </View>
  );
};

export default StatItem;
