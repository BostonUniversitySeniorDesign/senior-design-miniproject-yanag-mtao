import React from 'react';
import { Button } from 'react-native';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function GoogleSignIn() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
  );
}

render() {
  <GoogleSigninButton
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={this.GoogleSignIn}
    disabled={this.state.isSigninInProgress} />
}