import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <SafeAreaView className="bg-accent flex-1 justify-center items-center">
      <Animatable.View animation="slideInUp" className="h-96 w-full">
        <LottieView
          source={require('../assets/Preparing_Order.json')}
          autoPlay
          loop
        />
      </Animatable.View>
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg p-2 pb-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to Accept your Order!
      </Animatable.Text>
      <Progress.Circle
        size={60}
        indeterminate={true}
        color="white"
      ></Progress.Circle>
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
