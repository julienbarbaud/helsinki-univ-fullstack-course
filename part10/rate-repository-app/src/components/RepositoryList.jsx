import { FlatList, View, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput } from "react-native-web";
import { useDebounce } from "use-debounce";
import ListOptionsHeader from "./ListOptionsHeader";

const styles = StyleSheet.create({
  separator: {
    height: 13,
  },
});

const Separator = () => <View style={styles.separator} />;

// Note: contrarily to what the course suggested, no issue with the list header unmounting/losing focus
// the feature was tested on both android and web browser versions (no access to iOS)
// therefore, the FlatList was kept as is and no effort was made to turn it into a class Component
export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
  filter,
  setFilter,
  scrollMore,
}) => {
  // Get the nodes from the edges array
  const repositoryNodes = repositories.edges.map((edge) => edge.node);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <ListOptionsHeader
            filter={filter}
            setFilter={setFilter}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
          />
        }
        data={repositoryNodes}
        contentContainerStyle={{ paddingBottom: insets.bottom + 10 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={(repo) => repo.id}
        renderItem={({ item }) => (
          <Link to={`/repository/${item.id}`}>
            <RepositoryItem item={item} />
          </Link>
        )}
        onEndReached={scrollMore}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("latest");
  const [filter, setFilter] = useState("");
  const [debouncedFilter] = useDebounce(filter, 700);
  const [repositories, fetchMore] = useRepositories(
    selectedOrder,
    debouncedFilter,
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      filter={filter}
      setFilter={setFilter}
      scrollMore={fetchMore}
    />
  );
};

export default RepositoryList;
