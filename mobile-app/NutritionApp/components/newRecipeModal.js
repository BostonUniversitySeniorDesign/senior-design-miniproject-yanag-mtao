
import React, { useState } from 'react';

import { StyleSheet, Text, TextInput, View, SafeAreaView, Button, Modal, Pressable} from 'react-native';










export default function NewRecipeModal(props) {
   const [text, onChangeText] = React.useState("");
   const [modalVisible, setModalVisible]     = useState(false);



  const newRecipe = () => {
    setModalVisible(false);
    onChangeText("");
    props.createNewRecipe(text);
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
               <Text > Enter the name of your recipe:</Text>
               <SafeAreaView>
               <TextInput
                 style={styles.input}
                 onChangeText={onChangeText}
                 value={text}
               />
               </SafeAreaView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  onChangeText("");
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={()=>{newRecipe();}}
              >
                <Text style={styles.textStyle}>Create New Recipe</Text>
              </Pressable>

             </View>
           </View>
         </Modal>



   <Pressable
           style={[styles.button, styles.buttonOpen]}
           onPress={() => setModalVisible(true)}
         >
           <Text style={styles.textStyle}>Create New Recipe</Text>
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