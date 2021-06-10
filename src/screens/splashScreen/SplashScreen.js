import React, {useState, useEffect} from 'react';
import {SafeAreaView, View,Text} from 'react-native';
import {
  _storeData,
  emailValidate,
  resetNavigation,
  _retrieveData,
} from '../../asyncStorage/Local';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    _retrieveData()
      .then(res => {
          console.log('KSKKSKSKKSKS',res);
          if(res)
          {
              resetNavigation(navigation,'Notes');

          }
          else{
            resetNavigation(navigation,'Login');
          }
      })
      .catch(error => {console.log('kskksksksk',error)});
  });

  return (
      <View style={{backgroundColor:'#66CCCC',flex:1,alignItems: 'center',justifyContent: 'center'}}>
          <Text style={{fontSize:40,textAlign:'center',fontWeight:'bold',color:'white'}}>Notes</Text>
      </View>
  );
};

export default SplashScreen;
