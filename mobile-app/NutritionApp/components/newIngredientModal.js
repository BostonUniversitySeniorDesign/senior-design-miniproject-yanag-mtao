
import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, TextInput, View,
         SafeAreaView, Button, Modal, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AddFoodButton from "./addFoodButton";










export default function NewIngredientModal(props) {
  console.log("from modal, barcode: ", props.barCodeIngredient);
  // set data received from barcode

    var [nameText, onChangeNameText]         = React.useState("");
    var [servingsText, onChangeServingsText] = React.useState("1");
    var [caloriesText, onChangeCaloriesText] = React.useState("0");
    var [modalVisible, setModalVisible]      = useState(false);


  const navigation = useNavigation();

  const newIngredient = () => {
    setModalVisible(false);
    onChangeNameText("");
    props.createNewIngredient({
      name:                   nameText,
      servings:               parseInt(servingsText),
      "calories per serving": parseInt(caloriesText),
    });
  };

  useEffect(() => {
    if (props.barCodeIngredient?.name) {
        setModalVisible(true);
        onChangeNameText(props.barCodeIngredient.name);
        onChangeServingsText(props.barCodeIngredient.servings.toString());
        onChangeCaloriesText(props.barCodeIngredient['calories per serving'].toString());
    }

  }, [props.barCodeIngredient]);

  const cancel = () => {
    onChangeNameText("");
    onChangeServingsText("1");
    onChangeCaloriesText("0");
    setModalVisible(!modalVisible);
  };

  return(
      <View>
      <Modal
          animationType="slide"
           transparent={true}
           visible={modalVisible}
           onRequestClose={() => {
             Alert.alert("Modal has been closed.");
             setModalVisible(!modalVisible);
           }}
         >
           <View >
             <View style={styles.modalView}>
               <SafeAreaView>
               <Pressable
                 style={[styles.button, styles.buttonClose]}
                 onPress={() => {setModalVisible(!modalVisible); navigation.navigate('BarCode');}}
               >
                 <Text style={styles.textStyle}>Get data from barcode</Text>
               </Pressable>
               <Text > Enter the name of your ingredient:</Text>
               <TextInput
                 style={styles.input}
                 onChangeText={onChangeNameText}
                 value={nameText}
               />
               <Text > Enter the number of servings:</Text>
               <TextInput
                 style={styles.input}
                 onChangeText={onChangeServingsText}
                 value={servingsText}
                 keyboardType="numeric"
               />
               <Text > Enter the calories per serving:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeCaloriesText}
                  value={caloriesText}
                  keyboardType="numeric"
                />
               </SafeAreaView>



              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={cancel}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={()=>{newIngredient();}}
              >
                <Text style={styles.textStyle}>Create New Ingredient</Text>
              </Pressable>

             </View>
           </View>
         </Modal>


         <AddFoodButton onPress={() => setModalVisible(true)}/>
         </View>

   );



};


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
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
   container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center",

    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
});