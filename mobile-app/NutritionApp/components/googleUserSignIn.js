import React, { useEffect, useContext } from 'react';
import { Text, Button } from 'react-native';

import firebase from 'firebase';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';


export default function GoogleUserSignIn() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      expoClientId: '377513650386-f5kcu9r0nl52leftfd277do21s3e81ft.apps.googleusercontent.com',
      webClientId: '377513650386-bavoedpc8tim7gal4po64sh373gsb0fv.apps.googleusercontent.com',
      androidClientId: '377513650386-nlo77cbtn19b5pr3g4s3b8f3cfcago7g.apps.googleusercontent.com',
      iosClientId: '377513650386-5rass0tt9ao84lp88s64t4mkbc4g24qk.apps.googleusercontent.com',
    },
  );



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
     title="Log In With Google"
     disabled={!request}
     onPress={() => {promptAsync();}} />);

 }