import React, {useState, useEffect} from 'react';

import {Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';


import HomeScreen from './screens/homeScreen';
import BarCodeScreen from './screens/barCodeScreen';
import NewRecipeScreen from './screens/newRecipeScreen';
import HelloScreen from './screens/HelloScreen';

const Stack = createNativeStackNavigator();


if (!firebase.apps.length) {
   firebase.initializeApp({
     apiKey:     Constants.manifest.extra.FIREBASE_API_KEY,
     authDomain: Constants.manifest.extra.FIREBASE_AUTH_DOMAIN,
     projectId:  Constants.manifest.extra.FIREBASE_PROJECT_ID
   });
     firebase.firestore().settings({ experimentalForceLongPolling: true });

}else {
   firebase.app(); // if already initialized, use that one
}



export const AppRouter = () => {
    const [user, setUser] = useState();


  firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
  });


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user? (
          <>
            <Stack.Screen name="Login" component={HelloScreen} />
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
