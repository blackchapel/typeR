import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNav from './AppNav';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SendOtpScreen from '../screens/SendOtpScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

const AuthNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={SendOtpScreen} name="SendOtp" />
      <Stack.Screen component={OtpVerificationScreen} name="OtpVerify" />
      <Stack.Screen component={ResetPasswordScreen} name="ResetPassword" />
      <Stack.Screen component={AppNav} name="AppNav" />
      <Stack.Screen component={RegisterScreen} name="Register" />
    </Stack.Navigator>
  );
};

export default AuthNav;
