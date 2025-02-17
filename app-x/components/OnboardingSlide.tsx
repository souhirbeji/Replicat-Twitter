import { View, Text, Image, Dimensions } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

type SlideProps = {
  title: string;
  description: string;
  icon: string;
  image: any;
  index: number;
  IconComponent: any;
};

const { width } = Dimensions.get('window');

export default function OnboardingSlide({ title, description, icon, image, index, IconComponent }: SlideProps) {
  return (
    <View className="flex-1 items-center justify-between py-8">
      <Animated.View 
        entering={FadeInDown.delay(index * 100).springify()}
        className="w-full items-center"
      >
        <Image 
          source={image}
          style={{
            width: width * 0.8,
            height: width * 0.8,
            resizeMode: 'contain'
          }}
        />
      </Animated.View>

      <View className="w-full space-y-4">
        <Animated.View 
          entering={FadeInUp.delay(index * 200).springify()}
          className="flex-row items-center justify-center space-x-2"
        >
          <IconComponent name={icon} size={30} color="#3b82f6" />
          <Text className="text-3xl font-bold text-gray-800">
            {title}
          </Text>
        </Animated.View>

        <Animated.Text 
          entering={FadeInUp.delay(index * 300).springify()}
          className="text-gray-600 text-center text-lg px-6 leading-relaxed"
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
}
