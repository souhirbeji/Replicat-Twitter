import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authSlice";
import "../../global.css";
import Global from "@/constants/Global";

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      await dispatch(login(credentials)).unwrap();
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message || "Une erreur est survenue");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <View className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-md">
          {/* Logo Twitter */}
          <View className="items-center mb-8">
            <Feather name="twitter" size={32} color="#3b82f6" />
          </View>

          {/* Titre */}
          <Text className="text-2xl font-bold text-center mb-6">
            Connectez-vous à X
          </Text>

          {/* Form */}
          <View className="space-y-6">
            {/* Message d'erreur */}
            {error && (
              <View className="bg-red-50 border border-red-400 text-red-700 p-3 rounded-md">
                <Text className="text-center">{error}</Text>
              </View>
            )}

            {/* Email Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Email
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
                placeholder="nom@exemple.com"
                keyboardType="email-address"
                value={credentials.email}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, email: text })
                }
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white"
                placeholder="••••••••"
                secureTextEntry
                value={credentials.password}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, password: text })
                }
              />
            </View>

            {/* Remember me and Forgot password */}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                {/* Case à cocher */}
                <Text className="text-sm text-gray-700 ml-2">
                  Se souvenir de moi
                </Text>
              </View>
              <TouchableOpacity>
                <Text className="text-sm text-blue-500">
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="w-full bg-blue-500 p-3 rounded-md"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-medium">
                {status === "loading" ? "Connexion en cours..." : "Se connecter"}
              </Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View className="mt-6">
              <Text className="text-sm text-gray-600 text-center">
                Pas encore de compte ?{" "}
                <Link
                  href="/auth/register"
                  className="text-blue-500 font-medium"
                >
                  Inscrivez-vous
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
