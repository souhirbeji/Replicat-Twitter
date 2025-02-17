import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';


export default function NotFoundScreen() {
  return (
    <View>
      <Text>Page non trouvée</Text>
      <Stack>
        <Link to="/app-x/app/(tabs)/chat">Chat</Link>
        <Link to="/app-x/app/(tabs)/home">Home</Link>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
