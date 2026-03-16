import { useQuery } from "@apollo/client";
import { USER_QUERY } from "src/graphql/queries";
import { FlatList, View } from "react-native";
import ReviewItem from "./ReviewItem";
import Text from "./Text";

const Spacer = () => <View style={{ height: 10 }} />;

const Header = () => (
  <Text fontSize="heading" fontWeight="bold">
    Your reviews:
  </Text>
);

const MyReviews = () => {
  const { data, loading, error } = useQuery(USER_QUERY, {
    variables: { includeReviews: true },
  });

  return data ? (
    <FlatList
      ListHeaderComponent={Header}
      ListHeaderComponentStyle={{ marginBottom: 20, alignItems: "center" }}
      ItemSeparatorComponent={Spacer}
      data={data.me.reviews.edges.map((e) => e.node)}
      renderItem={({ item }) => <ReviewItem review={item} title="repository" />}
    />
  ) : null;
};

export default MyReviews;
