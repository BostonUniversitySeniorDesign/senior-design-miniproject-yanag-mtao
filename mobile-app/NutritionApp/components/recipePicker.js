import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Picker, Text, View, Pressable,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { alignItems, paddingTop } from 'styled-system';







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

        {props.data?.length  ?
          (<Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 175, color: 'black',
             fontWeight: 'bold', fontSize: 25, transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }]}}
            onValueChange={onValueChange}
          >
            {
              props.data.map(d => <Picker.Item textStyle={{fontSize:25}} key={d.id} label={d.name} value={d} />)
            }
          </Picker>) :
          (<Text> You have no saved recipes. Create a new one!</Text>)}
        <View style={{paddingTop: 20}}>
        <Pressable
          disabled={props.data.length == 0}
          style={styles.button}
          onPress={() =>
            navigation.navigate('NewRecipe',
            {recipeId: selectedValue.id, recipeName: selectedValue.name})
          }
        >
          <Text style={{fontSize: 22}}>Go to recipe</Text>
        </Pressable>
        </View>
      </View>
    );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 100,
    alignItems: "center",
    paddingTop: 30,
    width: "50%"
  },
    button:{
      backgroundColor: '#d3d8e0', borderRadius: 10, padding:12
  }

});
