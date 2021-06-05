// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NotesList from '../screens/notesApp/App';
import Login from '../screens/login/LoginScreen';
import Signup from '../screens/registerScreen/Signup';
import ForgetPassword from '../screens/forgetPassword/ForgetPassword';
import AuthVerification from '../screens/verification/AuthVerification';
import ResetPassword from '../screens/resetPassword/ResetPassword';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="AuthVerification" component={AuthVerification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Notes" component={NotesList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
