import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { logout } from "@/redux/auth/authSlice";
import { getPostsBefore } from "@/redux/Posts/postThunk";
import { addPost } from "@/redux/Posts/postThunk";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Global from "@/constants/Global";
import PostCard from "@/components/PostCard/PostCard";
import PostForm from "@/components/PostForm/PostForm";
import UserAvatar from "@/components/UserAvatar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state : any) => state.auth);
  const { posts, loading, hasMore } = useAppSelector((state: { post: { posts: any[]; loading: boolean; hasMore: boolean } }) => state.post);
  console.log("user", user);

  useEffect(() => {
    dispatch(getPostsBefore()); // Chargement initial des posts
  }, [dispatch]);

  const loadMorePosts = () => {
    if (!loading && hasMore) {
      dispatch(getPostsBefore());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/auth/login");
  };

  const handlePublishPost = async (content : any) => {
    try {
      const postData = {
        name: user?.name || "Anonyme",
        content: content,
        author: user?.username || "anonymous",
      };
      
      await dispatch(addPost(postData)).unwrap();
      dispatch(getPostsBefore());
    } catch (error) {
      console.error("Erreur lors de la publication:", error);
      Alert.alert("Erreur", "Impossible de publier le post");
    }
  };

  const renderPost = ({ item }) => (
    <PostCard post={item} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="small" color="#3b82f6" />
      </View>
    );
  };

  return (
    <SafeAreaView style={Global.container}>
      {/* Header */}
      <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-300">

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

      {/* Contenu principal */}
      <View className="flex-1 bg-white">
        <PostForm onSubmit={handlePublishPost} />
        
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item._id}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 py-4">
              Aucun post disponible
            </Text>
          }
          refreshing={loading}
          onRefresh={() => dispatch(getPostsBefore())}
        />
      </View>
    </SafeAreaView>
  );
}
