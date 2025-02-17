// component/MessageBubble.tsx
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

type MessageBubbleProps = {
  message: string;
  time: string;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
};

export default function MessageBubble({ message, time, isOwn, status }: MessageBubbleProps) {
  return (
    <View className={`w-full flex-row ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <View className={`max-w-[80%]`}>
        <View 
          className={`
            rounded-2xl p-3
            ${isOwn 
              ? 'bg-blue-500 rounded-tr-none' 
              : 'bg-gray-200 rounded-tl-none'
            }
          `}
        >
          <Text 
            className={`text-base leading-6 ${isOwn ? 'text-white' : 'text-gray-800'}`}
          >
            {message}
          </Text>
        </View>
        
        <View className={`flex-row items-center mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <Text className="text-xs text-gray-500 mr-1">{time}</Text>
          {isOwn && status && (
            <Feather 
              name={status === 'read' ? 'check-circle' : 'check'} 
              size={12} 
              color={status === 'read' ? '#60a5fa' : '#9ca3af'}
            />
          )}
        </View>
      </View>
    </View>
  );
}
