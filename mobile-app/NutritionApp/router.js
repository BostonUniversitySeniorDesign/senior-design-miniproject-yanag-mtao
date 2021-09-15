import React, {useContext} from 'react';

import {Text} from 'react-native';
import {AuthContext} from './auth';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import BarCodeScreen from './screens/barCodeScreen';
import NewRecipeScreen from './screens/newRecipeScreen';
import HelloScreen from './screens/HelloScreen';

const Stack = createNativeStackNavigator();

export const AppRouter = () => {
  const { authData, loading } = useContext(AuthContext);
  console.log("routerrrr");
//  if (loading) {
//    return <Text>Loading</Text>;
//  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authData.token ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="NewRecipe"
            component={NewRecipeScreen}
            options={({ route }) => ({ title: route.params.recipeName })}
          />
          <Stack.Screen name="BarCode" component={BarCodeScreen} />
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
