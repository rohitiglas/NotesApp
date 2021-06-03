import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import styles from '../../login/LoginStyle';
const SearchBar = ({onChangeText, clearText, query}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        width: '90%',
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
      }}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        status="info"
        value={query}
        placeholder="Search"
        style={{
          height: 50,
          width: '80%',
          fontSize: 20,
          backgroundColor: 'white',
          marginBottom: 20,
          borderRadius: 20,
          padding: 10,
          paddingTop: 20,
          color: '#2c3e50',
          textAlignVertical: 'top',
        }}
        textStyle={{color: '#000'}}
      />
      <TouchableOpacity
        testID={'close-button'}
        style={{
          position: 'absolute',
          display: query ? '' : 'none',
          top: 12,
          right: 20,
          width: 30,
          height: 30,
          borderRadius: 25,
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={clearText}>
        <Text style={styles.buttonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SearchBar;
