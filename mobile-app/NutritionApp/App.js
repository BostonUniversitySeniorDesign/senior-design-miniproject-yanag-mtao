import React, { useState, useEffect, createContext }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {AppRouter} from './router';
import {AuthProvider} from './auth';


export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}


