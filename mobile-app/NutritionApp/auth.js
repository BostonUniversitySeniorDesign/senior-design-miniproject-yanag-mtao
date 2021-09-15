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
     firebase.firestore().settings({ experimentalForceLongPolling: true });

}else {
   firebase.app(); // if already initialized, use that one
}

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [authData, setAuthData] = useState({});
//  const [uid, setUid]     = useState();
  const [token, setToken] = useState();
//  const [name, setName]   = useState();

  const userData = {};

  console.log("hello frieend");
   // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user != null) {
      console.log('We are authenticated now! For sure!');
//      console.log(user);
     var token = null;
     var name  = null;
      try {
//         token = await user.getIdToken();
//         name  = user.displayName;
//         console.log(String(token));
//         console.log(authData);
//        setAuthData({'token': 'token'});
      }
      catch (error) {
        alert('could not get user token');
        console.error(error);
      }

//      setToken(user.getIdToken());
//      setUid(user.uid);
//      setName(user.displayName);
      //signIn(user);
    }
    else {
       console.log("no user");
       signIn();
    }
    console.log('boop');
    if (loading) {

      setLoading(false);
      console.log("loading is now ", loading);
    }

//    setToken({'token': 'token'});


  });

  const signIn = (user) => {
    console.log("Signing in");
    console.log("token man age");

    //call the service passing credential (email and password).
    //In a real App this data will be provided by the user from some InputText components.
    if (user) {
            //setAuthData({...user});

    }


    if (loading) {

      setLoading(false);
      console.log("loading is now ", loading);
    }

  };

  const signOut = () => {
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
    <AuthContext.Provider value={{ authData, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };