import { View, Text, Image } from "react-native";

type UserAvatarProps = {
  name?: string; // Rendre le nom optionnel
  size?: number;
  imageUrl?: string;
};

const getInitials = (name?: string) => {
  if (!name) return '?'; // Retourner un caractère par défaut si pas de nom
  
  return name
    .trim()
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 1) || '?';
};

const getRandomColor = (name: string = '') => {
  const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#6366f1', '#8b5cf6', '#ec4899'];
  const index = name.length % colors.length;
  return colors[index];
};

export default function UserAvatar({ name = '', size = 56 }: UserAvatarProps) {
  const initials = getInitials(name);
  const backgroundColor = getRandomColor(name);

  return (
    <View
      className={`rounded-full items-center justify-center`}
      style={{ width: size, height: size, backgroundColor : backgroundColor }}
    >
      <Text className="text-white font-bold" style={{ fontSize: size * 0.4 }}>
        {initials}
      </Text>
    </View>
  );
}
