import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ImageBackground } from 'react-native';
import axios from 'axios';


import * as firebase from 'firebase';
import 'firebase/firestore';

import AddFoodButton from "../components/addFoodButton";
import TrashButton from '../components/trashButton';
import { marginLeft } from 'styled-system';

const dbh = firebase.firestore();

const recipes = [];
const renderRow = (datum, i) => {
    return (
        <View key={i} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={styles.contentText}>
                {datum.name}
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={styles.contentText}>
                {datum.servings}
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={styles.contentText}>
                {datum["calories per serving"]}
              </Text>
            </View>
            <TrashButton onPress={() => navigation.navigate('BarCode')}/>
        </View>
    );
};

const getNutritionDataUsingAsyncAwaitGetCall = async (barcode) => {
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


const Ingredients = () => {
  const [ loading, setLoading ] = useState(true);
  const [ recipe, setRecipe ]   = useState([]);

  const ref = dbh.collection('recipes').doc("w4NgFrIpJ59ccPJv3lDw");

  useEffect(() => {
    ref
      .onSnapshot((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setRecipe(doc.data());
        if (loading) {
          console.log("No longer loading");
          setLoading(false);
        }
      });

  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
    <Text style={styles.baseText}>{recipe.name}</Text>
    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={styles.contentText}>
                Ingredient Name
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={styles.contentText}>
                Servings
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={styles.contentText}>
                Calories per serving
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text style={styles.contentText}>
                Delete
              </Text>
            </View>
        </View>
    {
      recipe.ingredients.map((datum, i) => { // This will render a row for each data element.
        return renderRow(datum, i);
      })
    }
    </>
  );
};


export default function NewRecipeScreen({ navigation, route }) {
  const recipes = useState([]);

  React.useEffect(() => {
        if (route.params?.barCodeData) {
          alert(`Bar code with data ${route.params?.barCodeData} has been scanned!`);
          getNutritionDataUsingAsyncAwaitGetCall(route.params?.barCodeData);

        }
      }, [route.params?.barCodeData]);

  return (
    <ImageBackground
            style={styles.background}
            source={require("../assets/Foodbackground.png")}
        >
          <View style={styles.cover}>
          <Ingredients/>
          <AddFoodButton onPress={() => navigation.navigate('BarCode')}/>
          <Button
            title="Save"
            onPress={() =>  navigation.goBack()}
          />
          </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
},
  baseText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft: 10,
    color: "#FF9700"
  },
  contentText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 5,
    marginTop: 5,
    color: "#FFDB5F"
  },
  cover: {
    marginTop: 10,
    width: 350,
    height: 650,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.4)'
},
});
