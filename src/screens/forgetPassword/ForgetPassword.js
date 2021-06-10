import React, {useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './forgetStyle';
import axios from 'axios';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import {emailValidate, resetNavigation} from '../../asyncStorage/Local';

export const ValidationErrors = {
  FormEmpty: 'Form fields cannot be blank',
  UsernameEmpty: 'Please enter valid email',
  PasswordEmpty: 'Password cannot be blank',
};
const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [validationError, setValidationError] = useState('');

  const onLoginClick = () => {
    if (!emailValidate(email)) {
      setEmailError(ValidationErrors.UsernameEmpty);
    } else {
      setLoader(true);
      axios
        .post('/api/forgetPassword', {
          email,
        })
        .then(function (response) {
          setLoader(false);
          console.log('Forget password Response', response.data.otp);
          Alert.alert(
            '',
            `You can use this OTP ${response?.data?.otp} as of now to reset your password`,
          );
          navigation.navigate('AuthVerification', {
            email,
            getOtp: response?.data?.otp,
          });
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

        {validationError.length !== 0 && (
          <Text testID={'text-error'} style={styles.errorText}>
            {validationError}
          </Text>
        )}
        <TouchableOpacity
          testID={'submit-button'}
          style={styles.buttonContainer}
          onPress={onLoginClick}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;
