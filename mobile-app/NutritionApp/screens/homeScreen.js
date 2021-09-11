import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AuthScreen from '../components/googleUserSignIn';
import BarCodeScreen from './barCodeScreen';

import firebase from 'firebase/app';


firebase.initializeApp({
  apiKey:     'xxxxxxx',
  authDomain: 'xxxxxxx',
  projectId:  'xxxxxxx'
});



export default function HomeScreen({ navigation, route }) {

  React.useEffect(() => {
      if (route.params?.barCodeData) {
        alert(`Bar code with data ${route.params?.barCodeData} has been scanned!`);
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
      }
    }, [route.params?.barCodeData]);

  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <AuthScreen/>
      <Button
        title="Go to Barcode Scanner"
        onPress={() => navigation.navigate('BarCode')}
      />
      <Button
        title="Create New Recipe"
        onPress={() => navigation.navigate('NewRecipe')}
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
