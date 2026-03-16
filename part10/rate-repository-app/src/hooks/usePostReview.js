import { useApolloClient, useMutation } from "@apollo/client";
import { POST_REVIEW_MUTATION } from "src/graphql/mutations";
import { useNavigate } from "react-router-native";

const usePostReview = () => {
  const [post] = useMutation(POST_REVIEW_MUTATION);
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const postWrapper = async (review) => {
    const { data } = await post({ variables: { review } });
    const repoId = data.createReview.repository.id;
    apolloClient.resetStore();
    navigate(`/repository/${repoId}`);
  };
  return postWrapper;
};

export default usePostReview;
