import React, {useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './authStyle';
import axios from 'axios';
import Loader from '../../components/Loader';
import OtpInput from '../../components/OtpInput';

export const ValidationErrors = {
  FormEmpty: 'Form fields cannot be blank',
  UsernameEmpty: 'Please enter valid OTP',
  PasswordEmpty: 'Password cannot be blank',
};
const AuthVerification = ({route, navigation}) => {
  const [otp, setOtp] = useState('');
  const [loader, setLoader] = useState(false);
  const [otpError, setOtpError] = useState('');

  const onLoginClick = () => {
    const {email, getOtp} = route.params;
    if (otp.length === 0) {
      setOtpError(ValidationErrors.UsernameEmpty);
    } else {
      setLoader(true);
      axios
        .post('/api/otpVerification', {
          otp,
        })
        .then(function (response) {
          setLoader(false);
          console.log('Add Notes Response', response);
          Alert.alert('', 'OTP verified successfully');
          navigation.navigate('ResetPassword', {email});
        })
        .catch(function (error) {
          setLoader(false);
          console.log('Add Notes Error', error);
          Alert.alert('', 'Error OTP verification');
        });
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaViewWrapper}>
      <Loader isLoading={loader} />
      <View style={styles.wrapper}>
        <StatusBar barStyle="light-content" />
        <OtpInput
          textInputStyle={{color: '#FFFFFF'}}
          handleTextChange={text => setOtp(text)}
        />
        <TouchableOpacity
          testID={'submit-button'}
          style={styles.buttonContainer}
          onPress={onLoginClick}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AuthVerification;
