import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {useAuth} from '../auth';
import firebase from 'firebase';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

import GoogleUserSignIn from '../components/googleUserSignIn'


if (!firebase.apps.length) {
   firebase.initializeApp({
     apiKey:     'xxx',
     authDomain: 'xxx',
     projectId:  'xxx'
   });
}else {
   firebase.app(); // if already initialized, use that one
}


export default function LoginScreen({ navigation, route }) {
  const auth = useAuth();



  return (
    <View style={styles.container}>

      <GoogleUserSignIn/>
      <Button
        title="Log out"
        onPress={auth.signOut}
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
