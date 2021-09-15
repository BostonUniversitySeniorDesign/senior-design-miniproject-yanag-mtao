import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button,ImageBackground, Modal, Pressable} from 'react-native';

import BarCodeScreen from './barCodeScreen';
//import {AuthContext} from '../auth';
import AddFoodButton from "../components/addFoodButton";
import LogoutButton from '../components/logoutButton';
import RecipePicker from '../components/recipePicker';
import NewRecipeModal from '../components/newRecipeModal';


import firebase from 'firebase/app';

const dbh = firebase.firestore();


export default function HomeScreen({ navigation, route }) {
//  const { authData, signOut }                = useContext(AuthContext);
  const [ selectedRecipe, setSelectedRecipe] = useState({});
  const [ recipes, setRecipes]               = useState([]);

  let user = firebase.auth().currentUser;
  const ref = dbh.collection('recipes');

  console.log("homescreeen user", user);

  // update ingredients from database as needed
  useEffect(() => {
      ref
        .where("userId", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          const rs = querySnapshot.docs.map(doc => { return {id: doc.id, name: doc.data().name};});
          setRecipes(rs);
        });

    }, []);


   const createNewRecipe = (name) => {
      ref.add({
        name: name,
        userId: user.uid,
        ingredients: [],
      });
   };

   const signOut = () => {
     firebase.auth().signOut().then(() => {
          // Sign-out successful.
          console.log("Sign out successful");
        }).catch((error) => {
          // An error happened.
          alert("Unable to sign out");
        });

   };


//  console.log("auth data", authData);
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/Foodbackground.png")}
    >
    <View style={styles.container}>
      <Text style={styles.contentText}> Welcome {user.displayName}!</Text>
      <RecipePicker data={recipes} />
       <NewRecipeModal createNewRecipe={createNewRecipe}/>

      <LogoutButton onPress= {signOut}/>
      <AddFoodButton onPress={() => navigation.navigate('NewRecipe')}/>

      <StatusBar style="auto" />
    </View>
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
   container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center",

    },
});
