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
import { register } from "../../redux/auth/authThunk";
import "../../global.css";
import Global from "@/constants/Global";

export default function RegisterScreen() {
  const [credentials, setCredentials] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      await dispatch(register(credentials)).unwrap();
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Registration failed:", error);
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
            Inscrivez-vous à X
          </Text>

          {/* Affichage des erreurs */}
          {error && (
            <View className="bg-red-50 border border-red-400 text-red-700 p-3 rounded-md mb-4">
              <Text className="text-center">{error}</Text>
            </View>
          )}

          {/* Formulaire */}
          <View className="space-y-6">
            {/* Username Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Nom d'utilisateur
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-base"
                placeholder="@utilisateur"
                value={credentials.username}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, username: text })
                }
              />
            </View>

            {/* Name Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Nom
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-base"
                placeholder="Votre nom"
                value={credentials.name}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, name: text })
                }
              />
            </View>

            {/* Email Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-1">
                Email
              </Text>
              <TextInput
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-base"
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
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-base"
                placeholder="••••••••"
                secureTextEntry
                value={credentials.password}
                onChangeText={(text) =>
                  setCredentials({ ...credentials, password: text })
                }
              />
              <Text className="mt-1 text-sm text-gray-500">
                Le mot de passe doit contenir au moins 6 caractères
              </Text>
            </View>

            {/* Bouton Inscription */}
            <TouchableOpacity
              className="w-full bg-blue-500 p-3 rounded-md mt-2"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-medium text-base">
                {status === "loading" ? "Inscription en cours..." : "S'inscrire"}
              </Text>
            </TouchableOpacity>

            {/* Redirection vers Connexion */}
            <View className="mt-6">
              <Text className="text-sm text-gray-600 text-center">
                Vous avez déjà un compte ?{" "}
                <Link href="/auth/login" className="text-blue-500 font-medium">
                  Connectez-vous
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
