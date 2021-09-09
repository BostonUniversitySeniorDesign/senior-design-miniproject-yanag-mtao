import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AuthScreen from '../components/googleUserSignIn';
import BarCodeScreen from '../components/barCodeScreen';


const Greeting = (props) => {
    return (
        <View style={styles.center}>
          <Text>Hello {props.name}!</Text>
        </View>
      );
}


export default function HomeScreen({ navigation, route }) {
//  const { user } = useContext(AuthenticatedUserContext);
//  const handleSignOut = async () => {
//    try {
//      await auth.signOut();
//    } catch (error) {
//      console.log(error);
//    }
//  };

  React.useEffect(() => {
      if (route.params?.barCodeData) {
        alert(`Bar code with data ${route.params?.barCodeData} has been scanned!`);
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
      }
    }, [route.params?.barCodeData]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello world!</Text>
      <Greeting name='Yana' />
      <AuthScreen/>
      <Button
        title="Go to Barcode Scanner"
        onPress={() => navigation.navigate('BarCode')}
      />
      <Button
        title="Create New Recipe"
        onPress={() => navigation.navigate('NewRecipe')}
      />

      <StatusBar style="auto" />
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
