import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ImageBackground } from 'react-native';
import axios from 'axios';


import * as firebase from 'firebase';
import 'firebase/firestore';

import AddFoodButton from "../components/addFoodButton";
import TrashButton from '../components/trashButton';
import IngredientTable from '../components/ingredientTable';
import { marginLeft } from 'styled-system';

const dbh = firebase.firestore();

const recipes = [];


export default function NewRecipeScreen({ navigation, route, props}) {
  const [ loading, setLoading ]             = useState(true);
  const [ recipe, setRecipe ]               = useState({});
  const [ totalCalories, setTotalCalories ] = useState(0);

  const dbh = firebase.firestore();
  const ref = dbh.collection('recipes').doc(route.params.recipeId);

  // update ingredients from database as needed
  useEffect(() => {
    ref
      .onSnapshot((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setRecipe(doc.data());
        console.log("recipe: ", recipe);
        if (loading) {
          console.log("No longer loading");
          setLoading(false);
        }
      });

  }, []);

  // Update total calories every time ingredients get updated
  useEffect(() => {
    if (recipe?.ingredients) {
      var totalCals = 0;
        recipe.ingredients.forEach(el => {totalCals += el["calories per serving"]*el.servings});
        setTotalCalories(totalCals);
    }
  }, [recipe]);


  // Handle getting barcode data from barcode scanner
  React.useEffect(() => {
    if (route.params?.barCodeData) {
      // Query USDA API
      getNutritionData(route.params?.barCodeData);

    }
  }, [route.params?.barCodeData]);


  const getNutritionData = async (barcode) => {
      // query USDA API
      try {
        const response = await axios
          .post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY', {
             query: barcode,
             dataType: ["Branded"],
             userId: 1,
           });
        console.log(JSON.stringify(response.data));
        data = response.data;
        if (data.totalHits == 0) {
          alert(`Unable to find food with barcode ${barcode}`);
        }
        else {
          food = data.foods[0];
          var cals = 0;
          for (let nutrient of food.foodNutrients) {
            console.log(nutrient);
            if (nutrient.nutrientName == "Energy") {
              cals = nutrient.value;
            }
          }
          ingredient = {
            'name' : food.lowercaseDescription,
            'servings': 1,
            "calories per serving": cals,
          };

          // update current state to show new ingredient
          setRecipe({
            ...recipe,
            "ingredients": [...recipe.ingredients, ingredient]
          });
        }
      } catch (error) {
        alert(error.message);
        console.error(error.message);
      }
    };

  const saveRecipe = async () => {
    try {
      await ref.update(recipe);
      alert("Successfully saved recipe!");
    }
    catch (error) {
      alert(error.message);
    }
  };

  const deleteIngredient = (idx) => {
    console.log(`deleting ingredient ${idx}`);
    var res = recipe.ingredients.filter((e, i) => {
      return (i != idx);
    });

    // set state to updated ingredient list
    setRecipe({
      ...recipe,
      "ingredients": res,
    });
  }




  return (
    <ImageBackground
            style={styles.background}
            source={require("../assets/Foodbackground.png")}
    >
      {loading ?
        (<Text style={styles.contentText}>Loading ingredients...</Text>) :
        (
        <>
        <IngredientTable
          colNames={['name', 'servings', 'calories per serving', '']}
          tableData={recipe.ingredients}
          deleteIngredient={deleteIngredient}
        />
         <Text style={styles.contentText}> Total Calories: {totalCalories}</Text>
          <Button
            title="Save"
            onPress={saveRecipe}
          />
          <AddFoodButton onPress={() => navigation.navigate('BarCode')}/>
        </>
        )

      }

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
    fontSize: 25,
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
