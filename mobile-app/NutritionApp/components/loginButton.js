import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';




const LoginButton = ({ onPress }) => (
    <TouchableOpacity
      onPress={onPress}
    >
      <Icon name='login' size={30} color='#FFFFFF' />

    </TouchableOpacity>
);

export default LoginButton;