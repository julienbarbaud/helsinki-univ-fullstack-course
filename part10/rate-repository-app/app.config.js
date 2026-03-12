require("dotenv").config();

export default {
  expo: {
    name: "rate-repository-app",
    slug: "rate-repository-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    jsEngine: "hermes",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      jsEngine: "hermes",
    },
    android: {
      jsEngine: "hermes",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.jbarbaud.raterepositoryapp",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      SERVER_URL: process.env.SERVER_URL,
      eas: {
        projectId: "786b82e5-f59e-4e21-94db-82e462cce536",
      },
    },
  },
};
