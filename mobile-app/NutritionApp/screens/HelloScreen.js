import React from 'react';
import { Alert, Button, ImageBackground, StyleSheet, View, Text } from 'react-native';
import GoogleUserSignIn from '../components/googleUserSignIn';


function HelloScreen({ navigation, route }) {
    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/Foodbackground.png")}
        >
            <View style={styles.welcomeContainer}>
            <Text style={styles.titleText}> Welcome</Text>
            <Text style={styles.titleText}> Login To Get Started!</Text>
            </View>
            <View style={styles.loginButton}>
              <GoogleUserSignIn/>
            </View>
            <Text style={styles.logintext}> -Login With Google-</Text>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeContainer: {
          flex: 3,
          width:350,
          justifyContent: "center",
          alignItems: "center"
    },
    loginButton: {
        flex: 2,
        marginTop: 50,
        width: 250,
        height: 70,
        alignItems: "center"
    },
    titleText:{
        fontSize: 30,
        fontWeight: 'bold',
        top: 70,
        marginLeft: 0,
        marginRight: 5,
        color: "black",
      },
      logintext:{
          bottom: 180
      }
})
export default HelloScreen;