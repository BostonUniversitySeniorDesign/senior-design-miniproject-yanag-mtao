import React, { useState, useEffect, createContext }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {AppRouter} from './router';
import HelloScreen from './screens/HelloScreen';


export default function App() {
  return (
      <AppRouter />
  );
}


