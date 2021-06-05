import React, {useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import styles from './signUpStyle';
import axios from 'axios';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

export const ValidationErrors = {
  FormEmpty: 'Form fields cannot be blank',
  UsernameEmpty: 'Username cannot be blank',
  PasswordEmpty: 'Password cannot be blank',
};
const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cPasswordError, setCPasswordError] = useState('');
  const [validationError, setValidationError] = useState('');

  const onLoginClick = () => {
    if (email.length === 0 && password.length === 0 && userName.length === 0) {
      setValidationError(ValidationErrors.FormEmpty);
    } else if (userName.length === 0) {
      setUserNameError(ValidationErrors.UsernameEmpty);
    } else if (password.length === 0) {
      setPasswordError(ValidationErrors.PasswordEmpty);
    } else if (confirmPassword.length === 0) {
      setCPasswordError(ValidationErrors.PasswordEmpty);
    } else {
      setLoader(true);
      axios
        .post('/api/registerUser', {
          email,
          userName,
          password,
        })
        .then(function (response) {
          setLoader(false);
          console.log('Add Notes Response', response);
          Alert.alert('', 'Register Successfully');
          navigation.navigate('Notes');
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
      case 'email':
        setEmail(text);
        setEmailError('');
        break;

      case 'userName':
        setUserName(text);
        setUserNameError('');
        break;

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
          style={styles.textInput}
          inputContainerStyle={{borderBottomWidth: 0}}
          testID={'input-email'}
          value={email}
          onChangeText={text => changeText(text, 'email')}
          placeholder={'Email'}
          placeholderTextColor="#808080"
          error={emailError}
        />
        <Input
          style={styles.textInput}
          inputContainerStyle={{borderBottomWidth: 0}}
          testID={'input-username'}
          value={userName}
          onChangeText={text => changeText(text, 'userName')}
          placeholder={'UserName'}
          placeholderTextColor="#808080"
          error={userNameError}
        />
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
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text
            style={{
              marginLeft: 10,
              color: '#fff',
              fontSize: 16,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            Already a member of Notes?
          </Text>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={{
                marginLeft: 8,
                marginRight: 10,
                color: '#ff2251',
                fontSize: 16,
                fontWeight: '900',
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              Login
            </Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
