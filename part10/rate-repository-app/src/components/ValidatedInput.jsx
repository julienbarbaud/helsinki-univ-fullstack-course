import Text from "./Text";
import { TextInput, StyleSheet } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    margin: 5,
    width: 200,
    padding: 2,
  },
  wrongInput: {
    borderColor: theme.colors.error,
  },
});

const ValidatedInput = ({ formik, type, isInvalid }) => (
  <>
    <TextInput
      style={[styles.input, isInvalid(type) && styles.wrongInput]}
      placeholder={type}
      value={formik.values[type]}
      onChangeText={formik.handleChange(type)}
      onBlur={formik.handleBlur(type)}
    />
    {isInvalid(type) && <Text color="error">{formik.errors[type]}</Text>}
  </>
);

export default ValidatedInput;
