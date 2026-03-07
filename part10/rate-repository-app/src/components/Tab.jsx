import Text from "./Text";
import { Link } from "react-router-native";
import { Pressable } from "react-native";

const Tab = ({ text, path }) => {
  return (
    <Link to={path}>
      <Text color="textSecondary" fontWeight="bold" fontSize="subheading">
        {text}
      </Text>
    </Link>
  );
};

export default Tab;
