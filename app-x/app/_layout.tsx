// app/_layout.tsx
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Provider, useDispatch } from "react-redux";
import {store} from "@/redux/store";
import { loadInitialState, setUser } from "../redux/auth/authSlice";

SplashScreen.preventAutoHideAsync();

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const initialState = await loadInitialState();
      if (initialState.isAuthenticated) {
        dispatch(setUser({ user: initialState.user, token: initialState.token }));
      }
      setIsReady(true);
      SplashScreen.hideAsync(); // Masquer l'écran de chargement après l'initialisation
    };

    initializeAuth();
  }, [dispatch]);

  if (!isReady) {
    return null; // Tu peux afficher un écran de chargement personnalisé ici
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Provider store={store}>
        <AppInitializer>
          <Slot />
        </AppInitializer>
      </Provider>
  );
}
