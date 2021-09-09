import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AuthScreen from './googleUserSignIn';
import BarCodeScreen from './barCodeScreen';


const Greeting = (props) => {
    return (
        <View style={styles.center}>
          <Text>Hello {props.name}!</Text>
        </View>
      );
}


export default function HomeScreen({ navigation }) {
//  const { user } = useContext(AuthenticatedUserContext);
//  const handleSignOut = async () => {
//    try {
//      await auth.signOut();
//    } catch (error) {
//      console.log(error);
//    }
//  };
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
