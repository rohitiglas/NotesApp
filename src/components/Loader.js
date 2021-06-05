import React from 'react';
import {ActivityIndicator, View, Modal} from 'react-native';

const Loader = ({isLoading}) => (
  <Modal transparent={true} visible={isLoading}>
    <View
      testID={'loader'}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  </Modal>
);
export default Loader;
