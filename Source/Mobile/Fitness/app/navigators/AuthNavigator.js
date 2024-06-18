import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChangePassword,
  ForgotScreen,
  SignInScreen,
  VerifyScreen,
} from '../screens';
import RegisterNavigator from './RegisterNavigator';
import {navigator} from '../constants/text';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={navigator['sign-in']} component={SignInScreen} />
      <Stack.Screen name={navigator['sign-up']} component={RegisterNavigator} />
      <Stack.Screen
        name={navigator['forgot-password']}
        component={ForgotScreen}
      />
      <Stack.Screen name={navigator['verify']} component={VerifyScreen} />
      <Stack.Screen
        name={navigator['change-password']}
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
