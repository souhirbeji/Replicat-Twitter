import { Tabs, useRouter, useSegments } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useDispatch, useSelector } from "react-redux";
import "../../global.css";

function TabLayoutContent() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Ca pouvais passer avec ça aussi !
  // const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => {
    checkToken();
  }, [dispatch]);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");
      if (token && userStr) {
        router.replace("/(tabs)");
      } else {
        router.replace("/auth/login");
      }
    } catch (error) {
      console.error("Error checking token:", error);
      router.replace("/auth/login");
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="comments" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayoutContent; 