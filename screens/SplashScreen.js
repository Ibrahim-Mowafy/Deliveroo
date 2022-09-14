import { View, Text } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1000);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="flex-1 bg-accent justify-center items-center">
      <Animatable.View animation="slideInUp" className="h-96 w-full">
        <LottieView
          source={require('../assets/splash_screen.json')}
          autoPlay
          loop
        />
      </Animatable.View>
      <Text className="text-white italic text-4xl font-bold">Deliveroo</Text>
    </View>
  );
};

export default SplashScreen;
