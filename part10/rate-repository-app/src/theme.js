import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: Platform.OS === "android" ? "green" : "#24292e",
    textSecondary: "#e7ebf0ff",
    textSubheading: "#586069ff",
    primary: "#0366d6",
    primaryDark: "#0151adff",
    background: "#e1e4e8",
    cardBackground: "white",
    error: "#d73a4a",
  },
  fontWeights: {
    normal: "400",
    bold: "bold",
  },
  fontSizes: {
    mainTitle: 20,
    heading: 18,
    subheading: 16,
    normal: 14,
  },
  fonts: {
    main: Platform.OS === "android" ? "Roboto" : "Arial",
  },
};

export default theme;
