import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectedBasketItems } from '../store/basketSlice';
import { useNavigation } from '@react-navigation/native';
import { selectBasketTotal } from '../store/basketSlice';
import Currency from 'react-currency-formatter';
import * as Animatable from 'react-native-animatable';


const BasketIcon = () => {
  const items = useSelector(selectedBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <Animatable.View
      animation="slideInUp"
      className="absolute bottom-10 w-full z-50 "
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className="mx-5 bg-accent p-4  rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2 ">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotal} currency="EGP" />
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default BasketIcon;
