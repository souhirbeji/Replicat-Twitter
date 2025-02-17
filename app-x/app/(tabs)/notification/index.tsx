import Global from "@/constants/Global";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationScreen() {
  return (
    <SafeAreaView style={Global.container}>
      <View>
        <Text className="text-xl font-bold text-gray-800">Notifications</Text>
      </View>
    </SafeAreaView>
  );
}
