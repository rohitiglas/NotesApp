import React from 'react';
import {Text} from 'react-native';

const Title = () => (
  <Text
    testID={'notes-title'}
    style={{
      color: '#66CCCC',
      textAlign: 'center',
      fontSize: 26,
      marginBottom: 20,
      fontWeight: '700',
    }}>
    Notes
  </Text>
);

export default Title;
