import {AsyncStorage} from 'react-native';
import {CommonActions} from '@react-navigation/native';

export const _storeData = async email => {
  try {
    await AsyncStorage.setItem('email', email);
  } catch (error) {
    // Error saving data
  }
};

export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('email');
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const resetNavigation = (navigation, screenName) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: screenName}],
    }),
  );
};

export const emailValidate = text => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(text) !== false;
};
