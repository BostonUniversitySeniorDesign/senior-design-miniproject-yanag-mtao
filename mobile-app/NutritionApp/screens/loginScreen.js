import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {AuthContext} from '../auth';

import GoogleUserSignIn from '../components/googleUserSignIn'


export default function LoginScreen() {
  const {  signIn, signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
    <GoogleUserSignIn/>
      <Button
        title="Log out"
        onPress={() => {
          console.log('clicked log out');
          signOut();
       }}
      />
      <Button
        title="hi"
        onPress={() => {
          console.log('hello');
       }}
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
