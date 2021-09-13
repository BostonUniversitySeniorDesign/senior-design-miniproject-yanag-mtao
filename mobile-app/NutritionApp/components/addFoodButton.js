import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';




const AddFoodButton = ({ onPress }) => (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 100,
      }}
      onPress={onPress}
    >
      <Icon name='plus' size={30} color='#01a699' />

    </TouchableOpacity>
);

export default AddFoodButton;