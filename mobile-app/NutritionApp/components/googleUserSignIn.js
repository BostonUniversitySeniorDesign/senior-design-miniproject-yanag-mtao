import React, { useEffect } from 'react';
import { Text, Button } from 'react-native';

import firebase from 'firebase';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import {useAuth} from '../auth';


if (!firebase.apps.length) {
  firebase.initializeApp({
       apiKey:     'xxx',
       authDomain: 'xxx',
       projectId:  'xxx'
     });
}else {
   firebase.app(); // if already initialized, use that one
}

export default function GoogleUserSignIn() {
  const auth = useAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
        expoClientId: 'xxx',
        },
    );

  // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      console.log('We are authenticated now! For sure!');
      auth.signIn(user);
    }
    console.log('We are authenticated now! MAYBE?', user);
    // Do other things
  });


  React.useEffect(() => {
      if (response?.type === 'success') {
        console.log("res success");
        const { id_token } = response.params;
        console.log(id_token);

        const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
        console.log('firebase cred', credential);
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch(error => {
            // Handle Errors here.
            alert("Unable to log in");
          });

      }
    }, [response]);

    return (<Button
     title="Toggle Auth"
     disabled={!request}
     onPress={() => {promptAsync();}} />);

 }