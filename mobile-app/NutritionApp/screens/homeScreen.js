import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button,ImageBackground } from 'react-native';

import AuthScreen from '../components/googleUserSignIn';
import BarCodeScreen from './barCodeScreen';
import {useAuth} from '../auth';
import AddFoodButton from "../components/addFoodButton";
import LogoutButton from '../components/logoutButton';


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
    <ImageBackground
            style={styles.background}
            source={require("../assets/Foodbackground.png")}
        >
      <Text style={styles.contentText}> Welcome [UserName]!{authData.name}</Text>
      <AuthScreen/>
      <LogoutButton onPress= {signOut}/>
      <AddFoodButton onPress={() => navigation.navigate('NewRecipe')}/>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
},
contentText: {
  fontSize: 30,
  fontWeight: 'bold',
  marginLeft: 10,
  marginRight: 5,
  marginTop: 520,
  color: "#FFFFFF"
},
});
