import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import ValidatedInput from "./ValidatedInput";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    alignSelf: "flex-start",
  },
  disabled: {
    backgroundColor: "grey",
  },
});

export const LoginViewContainer = ({ handleSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("username is required"),
    password: yup
      .string()
      .min(5, "password must have at least 5 characters")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  const isInvalid = (valueName) =>
    formik.touched[valueName] && formik.errors[valueName];

  return (
    <View>
      <ValidatedInput type="username" formik={formik} isInvalid={isInvalid} />
      <ValidatedInput type="password" formik={formik} isInvalid={isInvalid} />
      <Pressable
        style={[
          styles.button,
          (isInvalid("username") || isInvalid("password")) && styles.disabled,
        ]}
        onPress={formik.handleSubmit}
      >
        <Text color="textSecondary">Log in</Text>
      </Pressable>
    </View>
  );
};

const LoginView = () => {
  const [signIn] = useSignIn();

  const handleSubmit = async (values) => {
    const result = await signIn({ credentials: values });
    console.log(`got token: ${result.data.authenticate.accessToken}`);
  };

  return <LoginViewContainer handleSubmit={handleSubmit} />;
};

export default LoginView;
