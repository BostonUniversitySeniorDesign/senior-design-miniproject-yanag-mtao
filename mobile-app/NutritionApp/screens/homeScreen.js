import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AuthScreen from '../components/googleUserSignIn';
import BarCodeScreen from './barCodeScreen';
import {useAuth} from '../auth';


import firebase from 'firebase/app';
import axios from 'axios';


if (!firebase.apps.length) {
   firebase.initializeApp({
        apiKey:     'xxx',
        authDomain: 'xxx',
        projectId:  'xxx'
      });
}else {
   firebase.app(); // if already initialized, use that one
}


const getDataUsingAsyncAwaitGetCall = async (barcode) => {
    try {
      const response = await axios
        .post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY', {
           query: barcode,
           dataType: ["Branded"],
           userId: 1,
         });
      alert(JSON.stringify(response.data));
    } catch (error) {
      alert(error.message);
    }
  };


export default function HomeScreen({ navigation, route }) {
  const {authData, signOut} = useAuth();


  React.useEffect(() => {
      if (route.params?.barCodeData) {
        alert(`Bar code with data ${route.params?.barCodeData} has been scanned!`);
        getDataUsingAsyncAwaitGetCall(route.params?.barCodeData);

      }
    }, [route.params?.barCodeData]);

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
