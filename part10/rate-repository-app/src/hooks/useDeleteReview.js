import { useMutation } from "@apollo/client";
import { DELETE_REVIEW_MUTATION } from "src/graphql/mutations";
import { Alert } from "react-native";

const useDeleteReview = () => {
  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION);
  const returnFunction = async (reviewId) => {
    Alert.alert("delete", "Do you really want to delete this review?", []);
  };
};

export default useDeleteReview;
