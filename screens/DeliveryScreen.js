import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { selectedRestaurant } from '../store/restaurantSlice';
import * as Progress from 'react-native-progress';
import { resetBasket } from '../store/basketSlice';

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectedRestaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetBasket());
  }, []);

  return (
    <View className="bg-accent flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 rounded-md py-5 px-3 z-50 shadow-md">
          <View className="flex-row  justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-3xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{ uri: 'https://links.papareact.com/fls' }}
              className="h-20 w-20"
            ></Image>
          </View>
          <Progress.Bar
            size={30}
            color="#00ccbb"
            indeterminate={true}
          ></Progress.Bar>
          <Text className="mt-3 text-xs text-gray-500">
            Your Order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <MapView
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-20">
        <Image
          source={require('../assets/delivery_man.png')}
          className="h-12 w-12 bg-gray-300 rounded-full ml-5 mb-6"
        />
        <View className="flex-1 mb-6">
          <Text className="text-lg">Ibrahim Mowafy</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-accent text-lg mr-5 font-bold mb-6">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
