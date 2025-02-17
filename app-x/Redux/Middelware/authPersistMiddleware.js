import AsyncStorage from "@react-native-async-storage/async-storage";

const authPersistMiddleware = (store) => (next) => async (action) => {
  const result = next(action);

  // Actions that require updating AsyncStorage
  const persistActions = [
    "auth/login/fulfilled",
    "auth/register/fulfilled",
    "auth/logout",
  ];

  if (persistActions.includes(action.type)) {
    const state = store.getState().auth;

    if (state.isAuthenticated && state.token) {
      await AsyncStorage.setItem("token", state.token);
      await AsyncStorage.setItem("user", JSON.stringify(state.user));
    } else {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    }
  }

  return result;
};

export default authPersistMiddleware;
