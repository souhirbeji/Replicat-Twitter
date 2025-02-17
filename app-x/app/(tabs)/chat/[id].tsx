// app/(tabs)/chat/[id].tsx
import { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import MessageBubble from '@/components/MessageBubble';
import Global from '@/constants/Global';
import { useSelector } from 'react-redux';
import { WS_URL } from '@/constants/Config';
import UserAvatar from '@/components/UserAvatar';

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
  timestamp: number; // Ajout d'un timestamp pour le tri
}

interface WebSocketMessage {
  type: string;
  messageId?: string;
  content?: string;
  senderId?: string;
  timestamp?: string;
  messages?: Array<{
    messageId: string;
    content: string;
    senderId: string;
    timestamp: string;
  }>;
}

interface User {
  id: string;
  username: string;
}

export default function ConversationScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const router = useRouter();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const { user } = useSelector((state: { auth: { user: User } }) => state.auth);
  const [connectionError, setConnectionError] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(false);

  const sendMessage = (): void => {
    if (message.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'private_message',
        recipientId: id,
        content: message.trim()
      }));
      setMessage('');
    }
  };

  useEffect(() => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 3;

    const connectWebSocket = (): void => {
      try {
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = (): void => {
          console.log('WebSocket connected');
          setIsOnline(true);
          setConnectionError(false);
          ws.current.send(JSON.stringify({
            type: 'auth',
            userId: user.id,
            username: user.username
          }));
        };

        ws.current.onerror = (e: Event): void => {
          console.error('WebSocket error:', e);
          setIsOnline(false);
          setConnectionError(true);
          if (reconnectAttempts < maxReconnectAttempts) {
            setTimeout(() => {
              reconnectAttempts++;
              connectWebSocket();
            }, 2000 * reconnectAttempts);
          }
        };

        ws.current.onmessage = (e: MessageEvent): void => {
          const messageData: WebSocketMessage = JSON.parse(e.data);
          switch (messageData.type) {
            case 'private_message':
              const timestamp = new Date(messageData.timestamp!).getTime();
              setMessages(prev => [...prev, {
                id: `${messageData.messageId}-${timestamp}`, // Création d'une clé unique
                text: messageData.content!,
                time: new Date(messageData.timestamp!).toLocaleTimeString().slice(0, 5),
                isOwn: messageData.senderId === user.id,
                status: 'delivered',
                timestamp: timestamp
              }]);
              break;
            case 'message_history':
              setMessages(messageData.messages!.map(msg => {
                const msgTimestamp = new Date(msg.timestamp).getTime();
                return {
                  id: `${msg.messageId}-${msgTimestamp}`, // Création d'une clé unique
                  text: msg.content,
                  time: new Date(msg.timestamp).toLocaleTimeString().slice(0, 5),
                  isOwn: msg.senderId === user.id,
                  status: 'delivered',
                  timestamp: msgTimestamp
                };
              }));
              break;
          }
        };

        ws.current.onclose = (): void => {
          setIsOnline(false);
          console.log('WebSocket disconnected');
        };

      } catch (error) {
        setIsOnline(false);
        console.error('WebSocket connection error:', error);
        setConnectionError(true);
      }
    };

    connectWebSocket();
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [user.id]);

  if (connectionError) {
    return (
      <SafeAreaView style={Global.container}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">
            Impossible de se connecter au serveur de chat.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={Global.container}>
      <View className="flex-row items-center py-4 px-4 border-b border-gray-200">
        <Feather 
          name="chevron-left" 
          size={24} 
          color="black" 
          onPress={() => router.back()} 
        />
        <View className="flex-1 flex-row items-center">
            <View className="flex-row items-center">
            <UserAvatar name={name} size={32} />
            <Text className='text-base font-medium ml-2'>{name}</Text>
            </View>

          <View className={`w-2.5 h-2.5 rounded-full ml-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={messages.sort((a, b) => a.timestamp - b.timestamp)} // Tri par timestamp
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <MessageBubble
              key={item.id} // Ajout de la prop key
              message={item.text}
              time={item.time}
              isOwn={item.isOwn}
              status={item.status}
            />
          )}
        />

        <View className="border-t border-gray-200 p-3 flex-row items-center space-x-4 bg-white shadow-sm">
          <View className="flex-1 bg-gray-50 rounded-2xl flex-row items-center px-4 py-2.5 border border-gray-100">
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Écrivez un message..."
              placeholderTextColor="#9ca3af"
              value={message}
              onChangeText={setMessage}
              multiline
              maxHeight={100}
            />
          </View>
          <Feather
            name="send"
            size={24}
            color={message.trim() ? '#2563eb' : '#d1d5db'}
            onPress={sendMessage}
            style={{ padding: 8 }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}