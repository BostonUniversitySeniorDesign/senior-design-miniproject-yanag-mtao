import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';




const LogoutButton = ({ onPress }) => (
    <TouchableOpacity
    style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 20,
        left: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
      }}
      onPress={onPress}
    >
      <Icon name='logout' size={30} color='#CACACA' />

    </TouchableOpacity>
);

export default LogoutButton;