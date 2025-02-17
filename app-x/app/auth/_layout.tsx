import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: {
                    backgroundColor: '#f3f4f6',
                },
                presentation: 'card',
            }}
        >
            <Stack.Screen 
                name="login" 
                options={{
                    headerShown: false,
                }}
                
            />
            <Stack.Screen 
                name="register" 
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}