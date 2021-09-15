import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button,ImageBackground } from 'react-native';

import BarCodeScreen from './barCodeScreen';
import {AuthContext} from '../auth';
import AddFoodButton from "../components/addFoodButton";
import LogoutButton from '../components/logoutButton';
import RecipePicker from '../components/recipePicker';


import firebase from 'firebase/app';

const dbh = firebase.firestore();
const ref = dbh.collection('recipes');


export default function HomeScreen({ navigation, route }) {
  const { authData, signOut } = useContext(AuthContext);
  const [ selectedRecipe, setSelectedRecipe] = useState({});
  const [ recipes, setRecipes] = useState([]);

  // update ingredients from database as needed
  useEffect(() => {
      ref
        .onSnapshot((querySnapshot) => {
          var cities = [];
          const rs = querySnapshot.docs.map(doc => { return {id: doc.id, name: doc.data().name};});
          console.log("got recipes? ", rs);
          setRecipes(rs);

        });

    }, []);


//  console.log("auth data", authData);
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/Foodbackground.png")}
    >
      <Text style={styles.contentText}> Welcome [UserName]!{authData.name}</Text>
      <RecipePicker data={recipes} />
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
  button: {
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
  },
  contentText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 5,
    marginTop: 50,
    color: "#FFFFFF"
  },
});
