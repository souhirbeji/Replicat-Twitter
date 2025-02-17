import { View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingSlide from '@/components/OnboardingSlide';
import { TouchableOpacity, Text } from 'react-native';
import { useState, useCallback } from 'react';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function Welcome() {
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      title: "X Social",
      description: "Explorez un monde de connexions infinies",
      icon: "rocket",
      image: require('@/assets/images/onboarding1.jpg'),
      IconComponent: MaterialCommunityIcons
    },
    {
      id: 2,
      title: "Actualités",
      description: "Restez informé des dernières tendances mondiales",
      icon: "trending-up",
      image: require('@/assets/images/onboarding2.jpg'),
      IconComponent: FontAwesome5
    },
    {
      id: 3,
      title: "Communauté",
      description: "Rejoignez une communauté dynamique et engagée",
      icon: "people",
      image: require('@/assets/images/onboarding3.jpg'),
      IconComponent: Ionicons
    }
  ];

  const handleNext = useCallback(() => {
    if (activeIndex === slides.length - 1) {
      router.push('/auth/login');
    } else {
      setActiveIndex(prev => prev + 1);
    }
  }, [activeIndex]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <Carousel
          loop={false}
          width={width}
          height={width * 1.5}
          data={slides}
          onProgressChange={(index) => setActiveIndex(Math.round(index))}
          renderItem={({ item, index }) => (
            <OnboardingSlide {...item} index={index} />
          )}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
        />

        <Animated.View 
          className="px-6 pb-10 space-y-6"
          entering={FadeInUp}
          exiting={FadeOutDown}
        >
          <View className="flex-row justify-center space-x-2">
            {slides.map((_, index) => (
              <Animated.View
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index 
                    ? 'w-6 bg-blue-500' 
                    : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </View>

          <TouchableOpacity
            className={`
              ${activeIndex === slides.length - 1 ? 'bg-blue-500' : 'bg-black'}
              py-4 px-6 rounded-full flex-row items-center justify-center space-x-2
            `}
            onPress={handleNext}
          >
            <Text className="text-white text-center font-bold text-lg">
              {activeIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}
            </Text>
            <MaterialCommunityIcons 
              name={activeIndex === slides.length - 1 ? 'login' : 'arrow-right'} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
