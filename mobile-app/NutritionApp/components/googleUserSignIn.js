import React from 'react';
import { Text, Button } from 'react-native';

import * as GoogleAuthentication from 'expo-google-app-auth';
import firebase from 'firebase';



export default class AuthScreen extends React.Component {
  state = { user: null };


//  componentDidMount() {
//
//    this.initAsync();
//  }

  signInWithGoogle = () => {
      console.log("Hello world");
      GoogleAuthentication.logInAsync({
          androidStandaloneAppClientId: '377513650386-nlo77cbtn19b5pr3g4s3b8f3cfcago7g.apps.googleusercontent.com',
//          iosStandaloneAppClientId: '377513650386-nlo77cbtn19b5pr3g4s3b8f3cfcago7g.apps.googleusercontent.com',
          androidClientId:
              "377513650386-nlo77cbtn19b5pr3g4s3b8f3cfcago7g.apps.googleusercontent.com",
//          iosClientId:
//              '377513650386-5rass0tt9ao84lp88s64t4mkbc4g24qk.apps.googleusercontent.com',
          scopes: ['profile', 'email']
      })
          .then((logInResult) => {
              if (logInResult.type === 'success') {
                  const { idToken, accessToken } = logInResult;
                  const credential = firebase.auth.GoogleAuthProvider.credential(
                      idToken,
                      accessToken
                  );
                        console.log("Success");

                  return firebase.auth().signInWithCredential(credential);
                  // Successful sign in is handled by firebase.auth().onAuthStateChanged
              }
              return Promise.reject(); // Or handle user cancelation separatedly
          })
          .catch((error) => {
              console.log(error)
              // ...
          });

  };
//  initAsync = async () => {
//    try {
//       await GoogleSignIn.initAsync();
//    }
//    catch ({ message }) {
//          alert('GoogleSignIn.initAsync(): ' + message);
//    }
//    this._syncUserWithStateAsync();
//  };

//  _syncUserWithStateAsync = async () => {
//    const user = await GoogleSignIn.signInSilentlyAsync();
//    this.setState({ user });
//  };
//
//  signOutAsync = async () => {
//    await GoogleSignIn.signOutAsync();
//    this.setState({ user: null });
//  };

  render() {
    return <Button title="Toggle Auth" onPress={this.signInWithGoogle} />;
  }
 }