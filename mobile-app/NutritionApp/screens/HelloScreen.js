import React from 'react';
import { Alert, Button, ImageBackground, StyleSheet, View } from 'react-native';
import LoginButton from "../components/loginButton";

function HelloScreen({ navigation, route }) {
    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/Foodbackground.png")}
        >
            <View style={styles.loginButton}>
            <LoginButton onPress={() => navigation.navigate("Home")}/>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    loginButton: {
        marginTop: 550,
        width: 250,
        height: 70,
        borderRadius: 100,
        backgroundColor: "#fc5c65",
        justifyContent: "center",
        alignItems: "center"
    },
})
export default HelloScreen;