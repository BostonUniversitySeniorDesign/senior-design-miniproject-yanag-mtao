import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import axios from 'axios';


import * as firebase from 'firebase';
import 'firebase/firestore';

import AddFoodButton from "../components/addFoodButton";




const Ingredients = (props) => {
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
              <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <Text>
                  {datum["calories per serving"]}
                </Text>
              </View>
              <Button
                title="del"
                onPress={() => props.deleteIngredient(i)}
              />
          </View>
      );
  };


  if (props.loading) {
    return <Text> Loading ingredients...</Text>
  }

  return (
    <>
    <Text>{props.recipe.name}</Text>
    {
      props.recipe.ingredients.map((datum, i) => { // This will render a row for each data element.
        return renderRow(datum, i);
      })
    }
    </>
  );
};


export default function NewRecipeScreen({ navigation, route, props}) {
  const [ loading, setLoading ]             = useState(true);
  const [ recipe, setRecipe ]               = useState({});
  const [ totalCalories, setTotalCalories ] = useState(0);

  const dbh = firebase.firestore();
  const ref = dbh.collection('recipes').doc("w4NgFrIpJ59ccPJv3lDw");

  // update ingredients from database as needed
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

  // Update total calories every time ingredients get updated
  useEffect(() => {
    if (recipe.ingredients) {
      var totalCals = 0;
        recipe.ingredients.forEach(el => {totalCals += el["calories per serving"]*el.servings});
        setTotalCalories(totalCals);
    }

  }, [recipe]);

  // Handle getting barcode data from barcode scanner
  React.useEffect(() => {
    if (route.params?.barCodeData) {
      // Query USDA API
      getNutritionDataUsingAsyncAwaitGetCall(route.params?.barCodeData);

    }
  }, [route.params?.barCodeData]);


  const getNutritionDataUsingAsyncAwaitGetCall = async (barcode) => {
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
          setRecipe({...recipe, "ingredients": [...recipe.ingredients, ingredient]});
        }
      } catch (error) {
        alert(error.message);
      }
    };

  const saveRecipe = async () => {
    try {
      ref.update(recipe);
    }
    catch (error) {
      alert(error.message);
    }

    alert("Successfully saved recipe!");


  };

  const deleteIngredient = (idx) => {
    // update current state to show new ingredient
    console.log(`deleting ingredient ${idx}`);
    var res = recipe.ingredients.filter((e, i) => {
      return (i != idx);
    });

    setRecipe({
      ...recipe,
      "ingredients": res,
    });
  }

  return (
    <View style={styles.container}>
          <Text>Creating New Recipe</Text>
          <Ingredients recipe={recipe} loading={loading} deleteIngredient={deleteIngredient}/>
          <Text>Total Calories: {totalCalories}</Text>
          <Button
            title="Save"
            onPress={saveRecipe}
          />
          <AddFoodButton onPress={() => navigation.navigate('BarCode')}/>
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
