import { useFormik } from "formik";
import * as yup from "yup";
import ValidatedInput from "./ValidatedInput";
import { Pressable } from "react-native";
import Text from "./Text";
import usePostReview from "../hooks/usePostReview";

const PostReview = () => {
  const post = usePostReview();
  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const validationSchema = yup.object().shape({
    ownerName: yup
      .string()
      .required("the name of the repo's owner is required"),
    repositoryName: yup
      .string()
      .required("the name of the repository is required"),
    rating: yup
      .number()
      .required("rating is required")
      .positive("ratings can not be negative")
      .max(100, "ratings do not go higher than 100"),
    text: yup.string(),
  });

  const onSubmit = () => {
    post({ ...formik.values, rating: Number(formik.values.rating) });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const isInvalid = (name) => formik.touched[name] && formik.errors[name];

  return (
    <>
      {Object.keys(initialValues).map((type) => (
        <ValidatedInput
          key={type}
          type={type}
          formik={formik}
          isInvalid={isInvalid}
          multiline={type === "text"}
        />
      ))}
      <Pressable onPress={formik.handleSubmit}>
        <Text>Post review</Text>
      </Pressable>
    </>
  );
};

export default PostReview;
