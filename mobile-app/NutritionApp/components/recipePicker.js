import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Picker, Text, View, Button,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';







export default function RecipePicker(props) {
    const [selectedValue, setSelectedValue] = useState();
    const navigation = useNavigation();

    const onValueChange = (itemValue, itemIndex) => {
      setSelectedValue(itemValue);
    };

     useEffect(() => {
          if (props.data) {
            setSelectedValue(props.data[0]);

          }

    }, [props.data]);

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 250, color: 'black', }}
          onValueChange={onValueChange}
        >
        {
          props.data.map(d => <Picker.Item key={d.id} label={d.name} value={d} />)
        }
        </Picker>
        <Button
          disabled={props.data.length == 0}
          title="Go to recipe"
          style={styles.button}
          onPress={() =>
            navigation.navigate('NewRecipe',
            {recipeId: selectedValue.id, recipeName: selectedValue.name})
          }
        />
      </View>
    );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",

  }
});
