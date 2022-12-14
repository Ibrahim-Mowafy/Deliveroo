import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
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
import client from '../sanity';
import * as Progress from 'react-native-progress';

const fetchRestaurants = () => {
  return client.fetch(
    `*[_type == "featured"]{
    ...,restaurant[]->{
      ...,dishes[]->
      }
    }`
  );
};

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const [featuredCategory, setFeaturedCategory] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchRestaurants()
      .then((responseData) => {
        setFeaturedCategory(responseData);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchRestaurants().then((responseData) => {
      setFeaturedCategory(responseData);

      setRefreshing(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Progress.Circle
          size={60}
          indeterminate={true}
          color="#00cc88"
        ></Progress.Circle>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white pt-3 pb-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={require('../assets/delivery_man.png')}
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#00cc88']}
          />
        }
      >
        {/* Categories */}
        <Categories />

        {/* Features rows */}
        {featuredCategory?.map((category) => (
          <FeaturesRows
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
