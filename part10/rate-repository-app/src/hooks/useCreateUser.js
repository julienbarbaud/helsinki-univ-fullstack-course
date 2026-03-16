import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "src/graphql/mutations";
import useSignIn from "./useSignIn";

const useCreateUser = () => {
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [signIn] = useSignIn();
  return async (user) => {
    await createUser({ variables: { user } });
    await signIn({ credentials: user });
  };
};

export default useCreateUser;
