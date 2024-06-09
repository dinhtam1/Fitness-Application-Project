import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ChangePassword,
  ForgotScreen,
  SignInScreen,
  VerifyScreen,
} from '../screens';
import RegisterNavigator from './RegisterNavigator';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Register" component={RegisterNavigator} />
      <Stack.Screen name="ForgotPassword" component={ForgotScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
