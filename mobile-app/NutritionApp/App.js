import React, { useState, useEffect, createContext }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {AppRouter} from './router';
import {AuthProvider} from './auth';
import HelloScreen from './screens/HelloScreen';


export default function App() {
  return (
    <HelloScreen></HelloScreen>,
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}


