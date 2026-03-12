import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 13,
  },
});

const Separator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const repositories = useRepositories();
  // Get the nodes from the edges array
  const repositoryNodes = repositories.edges.map((edge) => edge.node);

  return (
    <FlatList
      testID="repo-list"
      data={repositoryNodes}
      ItemSeparatorComponent={Separator}
      keyExtractor={(repo) => repo.id}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
