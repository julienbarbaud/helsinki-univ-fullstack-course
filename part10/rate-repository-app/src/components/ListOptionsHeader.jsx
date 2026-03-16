import { View, TextInput, StyleSheet } from "react-native";
import Text from "./Text";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  sortingOptions: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 15,
    alignItems: "center",
  },
  picker: {
    padding: 0,
    height: 50,
    width: 250,
  },
  filterBar: {
    marginHorizontal: 30,
    marginBottom: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

const ListOptionsHeader = ({
  filter,
  setFilter,
  selectedOrder,
  setSelectedOrder,
}) => {
  return (
    <View>
      <TextInput
        value={filter}
        onChangeText={(val) => setFilter(val)}
        style={styles.filterBar}
      />
      <View style={styles.sortingOptions}>
        <Text>Order by: </Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedOrder}
          onValueChange={(value) => setSelectedOrder(value)}
        >
          <Picker.Item label="latest" value="latest" />
          <Picker.Item label="top rated" value="top-rated" />
          <Picker.Item label="lowest rated" value="lowest-rated" />
        </Picker>
      </View>
    </View>
  );
};

export default ListOptionsHeader;
