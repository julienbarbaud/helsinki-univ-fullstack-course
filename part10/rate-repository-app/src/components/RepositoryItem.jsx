import { View, StyleSheet, Image } from "react-native";
import StatItem from "./StatItem";
import Text from "./Text";
import theme from "../theme";

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
});

const RepositoryItem = ({ item }) => (
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
  </View>
);

export default RepositoryItem;
