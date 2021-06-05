import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const FabButton = ({handleAdd, toggle}) => (
  <TouchableOpacity
    testID={'add-notes'}
    style={{
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 70,
      position: 'absolute',
      zIndex: 1,
      bottom: 30,
      right: 10,
      height: 70,
      backgroundColor: '#66CCCC',
      borderRadius: 100,
    }}
    onPress={handleAdd}>
    <Text
      style={{
        color: '#fff',
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: '700',
      }}>
      +
    </Text>
  </TouchableOpacity>
);
export default FabButton;
