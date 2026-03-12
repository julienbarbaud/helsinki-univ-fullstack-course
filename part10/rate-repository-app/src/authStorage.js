import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";

export const authStorageContext = createContext();

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
    this.tokenKey = `${this.namespace}:token`;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(this.tokenKey);
    return token;
  }

  async setAccessToken(accessToken) {
    return await AsyncStorage.setItem(this.tokenKey, accessToken);
  }

  async removeAccessToken() {
    return await AsyncStorage.clear();
  }
}

export default AuthStorage;
