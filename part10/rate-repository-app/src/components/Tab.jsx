import Text from "./Text";
import { Link } from "react-router-native";
import { Pressable } from "react-native";

const Tab = ({ text, path, callback }) => {
  const textComponent = (
    <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
      {text}
    </Text>
  );
  if (path) return <Link to={path}>{textComponent}</Link>;
  if (callback)
    return <Pressable onPress={callback}>{textComponent}</Pressable>;
};

export default Tab;
