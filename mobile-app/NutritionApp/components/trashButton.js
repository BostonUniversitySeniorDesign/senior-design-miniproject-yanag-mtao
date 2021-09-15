import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';




const trashButton = ({ onPress }) => (
    <TouchableOpacity
      onPress={onPress}
    >
      <Icon name='trash' size={30} color='#CACACA' />

    </TouchableOpacity>
);

export default trashButton;