import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@/constants/Config';

const myAxios = axios.create({
  baseURL: API_URL,
});

myAxios.interceptors.request.use(async (request) => {
  const token = await AsyncStorage.getItem("token");
  console.log("token envoyer", token);
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

myAxios.interceptors.response.use(
  async (response) => {
    if (response.data.token) {
      console.log("Token received:", response.data.token);
      await AsyncStorage.setItem("token", response.data.token);
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default myAxios;
