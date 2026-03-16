import { useParams } from "react-router-native";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { REPOSITORY_QUERY } from "../graphql/queries";
import RepositoryItem from "./RepositoryItem";
import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
  spacer: {
    height: 10,
  },
  repository: {
    marginBottom: 15,
  },
});

const Spacer = () => <View style={styles.spacer}></View>;

const SingleRepository = () => {
  const { id } = useParams();
  const variables = { id, first: 3 };
  const { data, loading, error, fetchMore } = useQuery(REPOSITORY_QUERY, {
    variables,
  });

  if (loading || error) return null;

  const reviews = data.repository.reviews.edges.map((e) => e.node);
  console.log(reviews);
  return (
    <>
      <FlatList
        ListHeaderComponent={
          <RepositoryItem singleView item={data.repository} />
        }
        ListHeaderComponentStyle={styles.repository}
        data={reviews}
        ItemSeparatorComponent={Spacer}
        renderItem={({ item }) => {
          return <ReviewItem review={item} title="user" />;
        }}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (!data.repository.reviews.pageInfo.hasNextPage) {
            return null;
          }
          fetchMore({
            variables: {
              after: data.repository.reviews.pageInfo.endCursor,
              ...variables,
            },
          });
        }}
      />
    </>
  );
};

export default SingleRepository;
