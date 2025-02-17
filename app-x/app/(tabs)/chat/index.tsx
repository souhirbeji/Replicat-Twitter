// app/(tabs)/chat/index.tsx
import React, { useEffect, useRef, useState } from "react";
import { WS_URL } from "@/constants/Config";
import {
  View,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, logout } from "@/redux/auth/authSlice";
import { useRouter } from "expo-router";
import ChatListItem from "@/components/ChatListItem";
import Global from "@/constants/Global";
import UserAvatar from "@/components/UserAvatar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

interface OnlineUser {
  userId: string;
  username: string;
  status: string;
}

export default function ChatScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user , users, status } = useAppSelector((state) => state.auth);
  const ws = useRef<WebSocket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  const handleLogout = async () => {
    try {
      if (ws.current) {
        ws.current.close();
      }
      await dispatch(logout());
      router.replace("/auth/login");
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  useEffect(() => {
    dispatch(getUsers());

    // Initialisation WebSocket
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      // Authentification de l'utilisateur
      ws.current?.send(JSON.stringify({
        type: 'auth',
        userId: user.id,
        username: user.username
      }));
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'user_list') {
        setOnlineUsers(data.users);
      }
    };

    ws.current.onerror = (e) => {
      console.error('WebSocket error:', e);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [dispatch, user]);

  // Fonction utilitaire pour vérifier si un utilisateur est en ligne
  const isUserOnline = (userId: string): boolean => {
    return onlineUsers.some(onlineUser => onlineUser.userId === userId);
  };

  if (status === "loading") {
    return (
      <SafeAreaView style={Global.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (status === "failed") {
    return (
      <SafeAreaView style={Global.container}>
        <Text>Error loading data</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={Global.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#e5e7eb",
        }}
      >
        
        <View style={{ flexDirection: "row", alignItems: "center"}}>
        <UserAvatar name={user?.name}  size={40} />
        <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 8 }}>
          {user?.name}
        </Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <FontAwesome name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full">
          <Feather name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Rechercher une conversation"
            placeholderTextColor="#666"
          />
        </View>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item : any) => item.id}
        renderItem={({ item }) => (
          <ChatListItem
            id={item.id}
            name={item.username}
            lastMessage={item.lastMessage || "No messages"}
            time={item.time || ""}
            isOnline={isUserOnline(item.id)}
          />
        )}
        className="flex-1"
      />
    </SafeAreaView>
  );
}
