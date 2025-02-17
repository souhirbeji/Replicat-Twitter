import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import UserAvatar from "./UserAvatar";

type ChatListItemProps = {
  id: string;
  avatar?: string;
  name: string;
  lastMessage: string;
  time: string;
  isOnline: boolean;
  unread?: number;
};

export default function ChatListItem({
  id,
  avatar,
  name,
  lastMessage,
  time,
  isOnline,
  unread = 0,
}: ChatListItemProps) {
  const router = useRouter();

  return (
    <Pressable
      className="flex-row items-center p-4 active:bg-gray-50"
      onPress={() => router.push(`/chat/${id}?name=${name}`)}
    >
      <View className="relative" style={{marginRight: 16}}>
        <UserAvatar name={name} imageUrl={avatar} />
        {isOnline && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>

      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-base text-gray-900">{name}</Text>
          <Text className="text-sm text-gray-500">{time}</Text>
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <View className="flex-row items-center flex-1 mr-4">
            {lastMessage.startsWith("Vous :") && (
              <Feather
                name="check-circle"
                size={14}
                color="#60a5fa"
                className="mr-1"
              />
            )}
            <Text className="text-gray-600 flex-1" numberOfLines={1}>
              {lastMessage}
            </Text>
          </View>
          {unread > 0 && (
            <View className="bg-blue-500 rounded-full min-w-[32px] h-6 px-2.5 items-center justify-center">
              <Text
                className="text-white text-xs font-bold"
                style={{ minWidth: 20, textAlign: "center" }}
              >
                {unread}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
