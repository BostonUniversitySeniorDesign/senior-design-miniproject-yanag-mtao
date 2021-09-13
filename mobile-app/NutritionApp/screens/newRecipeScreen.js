import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ImageBackground } from 'react-native';
import axios from 'axios';


import * as firebase from 'firebase';
import 'firebase/firestore';

import AddFoodButton from "../components/addFoodButton";

const dbh = firebase.firestore();

const recipes = [];
const renderRow = (datum, i) => {
    return (
        <View key={i} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text>
                {datum.name}
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text>
                {datum.servings}
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
              <Text>
                {datum["calories per serving"]}
              </Text>
            </View>
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
    <Text>{recipe.name}</Text>
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
          <Text>Creating New Recipe</Text>
          <Button
            title="Save"
            onPress={() =>  navigation.goBack()}
          />
          <AddFoodButton onPress={() => navigation.navigate('BarCode')}/>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
},
});
