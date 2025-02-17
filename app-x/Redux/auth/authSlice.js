// redux/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { register, login, getUsers } from "./authThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonction pour charger l'état initial depuis AsyncStorage
const loadInitialState = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    return {
      isAuthenticated: !!token,
      isNew: false,
      user: user,
      token: token,
      status: "idle",
      error: null,
      users: []
    };
  } catch (error) {
    console.error("Error loading initial state:", error);
    return {
      isAuthenticated: false,
      isNew: false,
      user: null,
      token: null,
      status: "idle",
      error: null,
      users: []
    };
  }
};

// Fonction pour sauvegarder les données utilisateur
const saveUserData = async (token, user) => {
  try {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

const initialState = {
  isAuthenticated: false,
  isNew: false,
  user: null,
  token: null,
  status: "idle",
  error: null,
  users: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      AsyncStorage.multiRemove(["token", "user"]).catch(console.error);
      return {
        ...initialState,
        status: "idle"
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.fulfilled, (state, action) => {
      state.status = "success";
      state.isAuthenticated = true;
      state.isNew = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveUserData(action.payload.token, action.payload.user);
    });

    // Login
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.isAuthenticated = true;
      state.isNew = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveUserData(action.payload.token, action.payload.user);
    });

    // Get users
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
    });
  }
});

export const { logout, clearError, setUser } = authSlice.actions;
export { register, login, getUsers, loadInitialState };
export default authSlice.reducer;
