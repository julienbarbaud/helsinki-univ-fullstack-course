import { View, StyleSheet, Pressable, Alert, Platform } from "react-native";
import Text from "./Text";
import theme from "src/theme";
import { format } from "date-fns";
import Button from "./Button";
import { useNavigate } from "react-router-native";
import { ApolloClient, useApolloClient, useMutation } from "@apollo/client";
import { DELETE_REVIEW_MUTATION } from "src/graphql/mutations";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
  },
  review: {
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 4,
    borderRadius: 200,
    padding: 6,
    marginLeft: 8,
  },
  titleDateContainer: {
    justifyContent: "space-around",
    gap: 6,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const ReviewItem = ({ review, title }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW_MUTATION, {
    variables: { deleteReviewId: review.id },
  });
  const apolloClient = useApolloClient();

  const alertButtons = [
    { text: "Cancel", onPress: () => console.log("cancelled operation") },
    {
      text: "confirm",
      onPress: async () => {
        await deleteReview(review.id);
        apolloClient.resetStore();
      },
    },
  ];
  const handleDelete = async () => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      Alert.alert(
        "delete",
        "Do you really want to delete this review?",
        alertButtons,
      );
    } else {
      // alert does not work on browser so we directly delete without confirmation screen
      alertButtons[1].onPress();
    }
  };

  // in our case, title can only take value "user" or "repository" so we use ternary operator
  // a switch statement would be cleaner for future extensibility
  const header =
    title === "user" ? review.user.username : review.repository.fullName;
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text
          color="primary"
          fontWeight="bold"
          fontSize="heading"
          style={styles.review}
        >
          {review.rating}
        </Text>
        <View style={styles.titleDateContainer}>
          <Text fontSize="subheading" fontWeight="bold">
            {header}
          </Text>
          <Text style={{ fontStyle: "italic" }}>
            {format(review.createdAt, "dd.MM.yyyy")}
          </Text>
        </View>
      </View>
      <Text>{review.text}</Text>
      {title === "repository" && (
        <View style={styles.buttonView}>
          <Button
            text="View Repository"
            handlePress={() => navigate(`/repository/${review.repository.id}`)}
            size="subheading"
          ></Button>
          <Button
            text="Delete Review"
            critical
            size="subheading"
            handlePress={handleDelete}
          />
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
