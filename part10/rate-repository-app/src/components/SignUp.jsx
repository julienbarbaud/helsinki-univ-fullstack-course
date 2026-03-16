import Text from "./Text";
import { useFormik } from "formik";
import * as yup from "yup";
import ValidatedInput from "./ValidatedInput";
import { Pressable, View } from "react-native";
import useCreateUser from "../hooks/useCreateUser";

const SignUp = () => {
  const createUser = useCreateUser();

  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required().min(5).max(30),
    password: yup.string().required().min(5).max(30),
    passwordConfirmation: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "the passwords do not match"),
  });

  const onSubmit = async () => {
    const { passwordConfirmation, ...credentials } = formik.values;
    await createUser(credentials);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const isInvalid = (name) => formik.touched[name] && formik.errors[name];
  return (
    <View>
      <ValidatedInput type="username" formik={formik} isInvalid={isInvalid} />
      <ValidatedInput type="password" formik={formik} isInvalid={isInvalid} />
      <ValidatedInput
        type="passwordConfirmation"
        formik={formik}
        isInvalid={isInvalid}
      />
      <Pressable onPress={formik.handleSubmit}>
        <Text>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
