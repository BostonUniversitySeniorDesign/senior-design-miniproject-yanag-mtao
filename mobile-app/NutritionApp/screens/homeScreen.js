import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import BarCodeScreen from './barCodeScreen';
import {AuthContext} from '../auth';




export default function HomeScreen({ navigation, route }) {
  const { authData, signOut } = useContext(AuthContext);


//  console.log("auth data", authData);
  return (
    <View style={styles.container}>
      <Text>Hello {authData.name}</Text>
      <Button
        title="Create New Recipe"
        onPress={() => navigation.navigate('NewRecipe')}
      />
      <Button
        title="Sign Out"
        onPress={() => {signOut();}}
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
