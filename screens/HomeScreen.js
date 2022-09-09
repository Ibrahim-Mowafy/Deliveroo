import React, { useLayoutEffect } from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Categories from '../components/Categories';
import FeaturesRows from '../components/FeaturesRows';

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-3">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-7 w-7 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs ">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00cc88" />
          </Text>
        </View>
        <UserIcon size={30} color="#00cc88" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 bg-gray-200 space-x-2 p-2 items-center">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurant and cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00cc88" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories */}
        <Categories />

        {/* Features rows */}
        <FeaturesRows
          id="test1"
          title="Featured"
          description="Paid placements form our partners"
        />
        {/* Tasty Discounts */}
        <FeaturesRows
          id="test2"
          title="Tasty Discounts"
          description="Paid placements form our partners"
        />
        {/* Offers near you */}
        <FeaturesRows
          id="test3"
          title="Offers near you!"
          description="Paid placements form our partners"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
