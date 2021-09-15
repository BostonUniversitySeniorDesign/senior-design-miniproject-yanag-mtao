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
          style={{ height: 50, width: 250, color: 'white', fontWeight: 'bold', fontSize: 20}}
          onValueChange={onValueChange}
        >
        {
          props.data.map(d => <Picker.Item key={d.id} label={d.name} value={d} />)
        }
        </Picker>
        <View style={styles.button}>
        <Button
          disabled={props.data.length == 0}
          title="Go to recipe"
          onPress={() =>
            navigation.navigate('NewRecipe',
            {recipeId: selectedValue.id, recipeName: selectedValue.name})
          }
        />
        </View>
      </View>
    );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 100
  },
    button:{
      color: "#fc5c65",
      width:"50%",
      bottom: 0
  }

});
