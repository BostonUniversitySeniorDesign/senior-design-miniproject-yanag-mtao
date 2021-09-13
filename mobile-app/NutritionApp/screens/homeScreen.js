import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AuthScreen from '../components/googleUserSignIn';
import BarCodeScreen from './barCodeScreen';
import {useAuth} from '../auth';


import firebase from 'firebase/app';


if (!firebase.apps.length) {
   firebase.initializeApp({
        apiKey:     'xxx',
        authDomain: 'xxx',
        projectId:  'xxx'
      });
}else {
   firebase.app(); // if already initialized, use that one
}





export default function HomeScreen({ navigation, route }) {
  const {authData, signOut} = useAuth();




  console.log("auth data", authData);
  return (
    <View style={styles.container}>
      <Text>Hello {authData.name}</Text>
      <AuthScreen/>
      <Button
        title="Go to Barcode Scanner"
        onPress={() => navigation.navigate('BarCode')}
      />
      <Button
        title="Create New Recipe"
        onPress={() => navigation.navigate('NewRecipe')}
      />
      <Button
        title="Sign Out"
        onPress={signOut}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
