import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

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



  return (
    <View style={styles.container}>
          <Text>Creating New Recipe</Text>
          <Ingredients/>
          <Button
            title="Save"
            onPress={() =>  navigation.goBack()}
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
