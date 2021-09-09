import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


import AddFoodButton from "./addFoodButton";

const myData = [
  {'key': 1, 'name': 'apple', 'servings': 1, 'cals_per_serving': 60},
  {'key': 2, 'name': 'banana', 'servings': 2, 'cals_per_serving': 100},
  {'key': 3, 'name': 'cantaloupe', 'servings': 1, 'cals_per_serving': 120},
];

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
                {datum.cals_per_serving}
              </Text>
            </View>
        </View>
    );
};

export default function NewRecipeScreen({ navigation, route }) {



  return (
    <View style={styles.container}>
          <Text>Creating New Recipe</Text>
          {
              myData.map((datum, i) => { // This will render a row for each data element.
                  return renderRow(datum, i);

              })
          }
          <Button
            title="Save"
            onPress={() =>  navigation.goBack()}
          />
          <AddFoodButton/>
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
