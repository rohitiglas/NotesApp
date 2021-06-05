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
import styles from './LoginStyle';
import axios from 'axios';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import {
  _storeData,
  emailValidate,
  resetNavigation,
} from '../../asyncStorage/Local';

export const ValidationErrors = {
  FormEmpty: 'Form fields cannot be blank',
  UsernameEmpty: 'Please enter valid email',
  PasswordEmpty: 'Password cannot be blank',
};
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [validationError, setValidationError] = useState('');

  const onLoginClick = () => {
    if (email.length === 0 && password.length === 0) {
      setValidationError(ValidationErrors.FormEmpty);
    } else if (!emailValidate(email)) {
      setEmailError(ValidationErrors.UsernameEmpty);
    } else if (password.length === 0) {
      setPasswordError(ValidationErrors.PasswordEmpty);
    } else {
      setLoader(true);
      axios
        .post('/api/login', {
          email,
          password,
        })
        .then(async function (response) {
          setLoader(false);
          console.log('Add Notes Response', response);
          Alert.alert('', 'Login Successfully');
          await _storeData(email);
          resetNavigation(navigation, 'Notes');
        })
        .catch(function (error) {
          setLoader(false);
          console.log('Add Notes Error', error);
          Alert.alert('', 'Error adding note.');
        });
    }
  };

  const changeText = (text, type) => {
    if (type === 'email') {
      setEmail(text);
      setEmailError('');
    } else {
      setPassword(text);
      setPasswordError('');
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
          testID={'input-username'}
          value={email}
          onChangeText={text => changeText(text, 'email')}
          placeholder={'UserName'}
          placeholderTextColor="#808080"
          error={emailError}
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

        {validationError.length !== 0 && (
          <Text testID={'text-error'} style={styles.errorText}>
            {validationError}
          </Text>
        )}
        <TouchableOpacity
          testID={'submit-button'}
          style={styles.buttonContainer}
          onPress={onLoginClick}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID={'forget-password'}
          onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.forgetText}>Forget Password</Text>
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
            Not a member of Notes?
          </Text>
          <TouchableNativeFeedback
            onPress={() => {
              navigation.navigate('SignUp');
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
              Sign up
            </Text>
          </TouchableNativeFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
