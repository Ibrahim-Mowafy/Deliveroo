import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { ArrowLongLeftIcon } from 'react-native-heroicons/solid';
import Currency from 'react-currency-formatter';

import { selectedRestaurant } from '../store/restaurantSlice';
import {
  removeFromBasket,
  selectBasketTotal,
  selectedBasketItems,
} from '../store/basketSlice';
import { urlFor } from '../sanity';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectedRestaurant);
  const items = useSelector(selectedBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  if (items.length === 0)
    return (
      <View className="flex-1 justify-center items-center p-3 relative bg-white">
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
        >
          <ArrowLongLeftIcon size={20} color="#00cc88" />
        </TouchableOpacity>
        <LottieView
          source={require('../assets/delivery-guy-waiting.json')}
          autoPlay
          loop
          className="w-11/12"
        />
        <Text className="text-3xl text-center">Hey, your basket is empty!</Text>
        <Text className="text-md text-gray-400 mt-5">
          Go on, stock up and order your faves.
        </Text>
        <TouchableOpacity
          className="mt-5 rounded-lg bg-accent p-4 w-10/12"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Add Items
          </Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-accent bg-white shadow-sm">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00ccbb" size={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={require('../assets/delivery_man.png')}
            className="h-7 w-9 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-accent">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="divide-y divide-gray-200"
        >
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-accent">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="EGP" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-accent text-xs"
                  onPress={() => {
                    dispatch(removeFromBasket({ id: key }));
                  }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="EGP" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency="EGP" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-semibold">Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 5.99} currency="EGP" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('PreparingOrderScreen')}
            className="rounded-lg bg-accent p-4"
          >
            <Text className="text-center text-white text-lg font-semibold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
