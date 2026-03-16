import { Pressable } from "react-native";
import Text from "./Text";
import { StyleSheet } from "react-native";
import theme from "src/theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 4,
  },
  criticalButton: {
    backgroundColor: theme.colors.error,
  },
});

const Button = ({ handlePress, text, critical, size }) => (
  <Pressable
    style={[styles.button, critical && styles.criticalButton]}
    onPress={handlePress}
  >
    <Text
      color="textSecondary"
      fontWeight="bold"
      fontSize={size ? size : "heading"}
    >
      {text}
    </Text>
  </Pressable>
);

export default Button;
