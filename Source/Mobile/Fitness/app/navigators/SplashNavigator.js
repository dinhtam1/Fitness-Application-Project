import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IntroduceScreen, SplashScreen} from '../screens';
import {navigator} from '../constants/text';

const SplashNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={navigator['splash']} component={SplashScreen} />
      <Stack.Screen
        name={navigator['introduction']}
        component={IntroduceScreen}
      />
    </Stack.Navigator>
  );
};
export default SplashNavigator;
