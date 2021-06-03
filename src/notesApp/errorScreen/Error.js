import React from 'react';
import {Text, View} from 'react-native';

const Error = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text
      testID={'no-notes'}
      style={{
        color: '#d90617',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700',
      }}>
      No Notes available
    </Text>
  </View>
);
export default Error;
