import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './homeScreen';
import BarCodeScreen from './barCodeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BarCode" component={BarCodeScreen} />
    </Stack.Navigator>
  </NavigationContainer>

  );
}


