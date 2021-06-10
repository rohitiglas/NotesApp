import React, {useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './resetStyle';
import axios from 'axios';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import {resetNavigation} from '../../asyncStorage/Local';

export const ValidationErrors = {
  FormEmpty: 'Form fields cannot be blank',
  UsernameEmpty: 'Username cannot be blank',
  PasswordEmpty: 'Password cannot be blank',
};
const ResetPassword = ({route, navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [cPasswordError, setCPasswordError] = useState('');
  const [validationError, setValidationError] = useState('');

  const onLoginClick = () => {
    if (password.length === 0) {
      setPasswordError(ValidationErrors.PasswordEmpty);
    } else if (confirmPassword.length === 0) {
      setCPasswordError(ValidationErrors.PasswordEmpty);
    } else {
      const {email} = route.params;
      setLoader(true);
      axios
        .patch('/api/resetPassword', {
          email,
          password,
        })
        .then(function (response) {
          setLoader(false);
          console.log('Reset Response', response);
          Alert.alert('', 'Password reset successfully');
          resetNavigation(navigation, 'Login');
        })
        .catch(function (error) {
          setLoader(false);
          console.log('Add Notes Error', error);
          Alert.alert('', 'Error adding note.');
        });
    }
  };

  const changeText = (text, type) => {
    switch (type) {
      case 'password':
        setPassword(text);
        setPasswordError('');
        break;

      case 'c_password':
        setConfirmPassword(text);
        setCPasswordError('');
        break;
    }
    setValidationError('');
  };
  return (
    <SafeAreaView style={styles.safeAreaViewWrapper}>
      <Loader isLoading={loader} />
      <View style={styles.wrapper}>
        <StatusBar barStyle="light-content" />
        <Input
          testID={'input-password'}
          value={password}
          onChangeText={text => changeText(text, 'password')}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.textInput}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholderTextColor="#808080"
          error={passwordError}
        />
        <Input
          testID={'input-c-password'}
          value={confirmPassword}
          onChangeText={text => changeText(text, 'c_password')}
          placeholder={'Confirm Password'}
          secureTextEntry={true}
          style={styles.textInput}
          inputContainerStyle={{borderBottomWidth: 0}}
          placeholderTextColor="#808080"
          error={cPasswordError}
        />

        {validationError.length !== 0 && (
          <Text testID={'text-error'} style={styles.errorText}>
            {validationError}
          </Text>
        )}
        <TouchableOpacity
          testID={'submit-button'}
          style={styles.buttonContainer}
          onPress={onLoginClick}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
