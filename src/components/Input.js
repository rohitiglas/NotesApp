import React from 'react';
import {TextInput, View, Text} from 'react-native';

const Input = props => (
  <View>
    <TextInput {...props} />
    <Text
      style={{margin: 10, color: '#ff2251', fontSize: 14, fontWeight: '900'}}>
      {' '}
      {props.error}{' '}
    </Text>
  </View>
);

export default Input;
