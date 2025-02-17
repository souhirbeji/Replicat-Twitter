// import { useEffect, useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
// import { setUser } from './redux/auth/authSlice';

// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     checkAuthState();
//   }, []);

//   const checkAuthState = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const userStr = await AsyncStorage.getItem('user');
      
//       if (token && userStr) {
//         const user = JSON.parse(userStr);
//         dispatch(setUser({ user, token }));
//       }
//     } catch (error) {
//       console.error('Error checking auth state:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   // ...rest of your App component
// }
