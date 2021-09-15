
import React, { useState } from 'react';

import { StyleSheet, Text, TextInput, View, SafeAreaView, Button, Modal, Pressable} from 'react-native';










export default function NewIngredientModal(props) {
   const [nameText, onChangeNameText]         = React.useState("");
   const [servingsText, onChangeServingsText] = React.useState("1");
   const [caloriesText, onChangeCaloriesText] = React.useState("0");
   const [modalVisible, setModalVisible]      = useState(false);



  const newIngredient = () => {
    setModalVisible(false);
    onChangeNameText("");
    props.createNewIngredient({
      name:                   nameText,
      servings:               parseInt(servingsText),
      "calories per serving": parseInt(caloriesText),
    });
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
                 placeholder="useless placeholder"
                 keyboardType="numeric"
               />
               <Text > Enter the calories per serving:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeCaloriesText}
                  value={caloriesText}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
               </SafeAreaView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
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



   <Pressable
           style={[styles.button, styles.buttonOpen]}
           onPress={() => setModalVisible(true)}
         >
           <Text style={styles.textStyle}>Add New Ingredient Manually</Text>
         </Pressable>
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