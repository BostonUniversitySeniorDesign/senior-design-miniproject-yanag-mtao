import React, { useEffect, useContext } from 'react';
import { Text, Button, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Constants from 'expo-constants';

import firebase from 'firebase';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';


export default function GoogleUserSignIn() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      expoClientId: Constants.manifest.extra.GOOGLE_EXPO_CLIENT_ID,
      webClientId: Constants.manifest.extra.GOOGLE_WEB_CLIENT_ID,
      androidClientId: Constants.manifest.extra.GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: Constants.manifest.extra.GOOGLE_IOS_CLIENT_ID,
    },
  );

  const LoginButton = ({ onPress }) => (
    <TouchableOpacity
    style={{backgroundColor: '#d3d8e0', borderRadius: 10, padding:10}}
    disabled={!request}
    onPress={() => {promptAsync();}}
    >
      <Icon name='google' size={50} color='black'>
       <Text style={ {fontSize :20} } > Sign in with Google</Text>
      </Icon>
    </TouchableOpacity>
);



  React.useEffect(() => {
      if (response?.type === 'success') {
        const { id_token } = response.params;

        const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch(error => {
            // Handle Errors here.
            alert("Unable to log in");
          });

      }
    }, [response]);

    return (

    <LoginButton />);

 }