import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as STRINGS from "../constants/strings";
import { Alert } from "react-native";
import { BASE_URL } from "../constants/url";
const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    Alert.alert(STRINGS.alertName, STRINGS.errorResponse);
    return Promise.reject(error);
  }
);

export default api;
