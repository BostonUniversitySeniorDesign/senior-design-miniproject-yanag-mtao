import React, {createContext, useState, useContext} from 'react';
import firebase from 'firebase';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

/* Authentication workflow based off of
https://levelup.gitconnected.com/react-native-authentication-flow-the-simplest-and-most-efficient-way-3aa13e80af61 */

if (!firebase.apps.length) {
   firebase.initializeApp({
     apiKey:     'AIzaSyC1NMYu8rodDtTIVH2i0HjCoJ1utX116iQ',
     authDomain: 'nutritionapp-779c5.firebaseapp.com',
     projectId:  'nutritionapp-779c5'
   });
}else {
   firebase.app(); // if already initialized, use that one
}

const AuthContext = createContext();


const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState({});

  const [loading, setLoading] = useState(false);








  const signIn = (user) => {
    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    //GoogleSignIn();
    if (user) {
     setAuthData({
            "token":               user.stsTokenManager.accessToken,
            "tokenExpirationTime": user.stsTokenManager.expirationTime,
            "email":               user.email,
            "name":                user.displayName,
            "photoURL":            user.photoURL,
            "uid":                 user.uid
           });
    }

  };

  const signOut = async () => {
    console.log("Signing out...");
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      setAuthData(undefined);
    }).catch((error) => {
      // An error happened.
      alert("Unable to sign out");
    });

  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{authData, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

//A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth}