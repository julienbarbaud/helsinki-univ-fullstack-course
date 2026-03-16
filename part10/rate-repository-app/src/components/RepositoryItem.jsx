import { View, StyleSheet, Image, Pressable } from "react-native";
import StatItem from "./StatItem";
import Text from "./Text";
import theme from "../theme";
import { openURL } from "expo-linking";
import Button from "./Button";

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 5,
    boxShadow: "4px 4px 7px black",
    marginHorizontal: 10,
    padding: 5,
  },
  description: {
    fontStyle: "italic",
    color: theme.colors.textSubheading,
  },
  languageTag: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.primary,
    color: theme.colors.textSecondary,
    padding: 5,
    borderRadius: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  infoContainer: {
    gap: 5,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
    margin: 5,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 4,
  },
});

const RepositoryItem = ({ item, singleView }) => {
  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={styles.avatar}
        ></Image>
        <View style={styles.infoContainer}>
          <Text fontWeight="bold" fontSize="heading">
            {item.fullName}
          </Text>
          <Text fontSize="subheading" style={styles.description}>
            {item.description}
          </Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <StatItem name="forks" value={item.forksCount} />
        <StatItem name="stars" value={item.stargazersCount} />
        <StatItem name="rating" value={item.ratingAverage} />
        <StatItem name="reviews" value={item.reviewCount} />
      </View>
      {singleView && (
        <Button text="Open in github" handlePress={() => openURL(item.url)} />
      )}
    </View>
  );
};

export default RepositoryItem;
