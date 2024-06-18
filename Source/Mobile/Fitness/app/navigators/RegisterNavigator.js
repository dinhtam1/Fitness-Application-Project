import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  GenderScreen,
  GoalScreen,
  GoalWeightScreen,
  HeightScreen,
  LevelScreen,
  OldScreen,
  SignUpScreen,
  StartScreen,
  WeightScreen,
} from '../screens';
import {navigator} from '../constants/text';

const RegisterNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={navigator['sign-up-2']} component={SignUpScreen} />
      <Stack.Screen name={navigator['gender']} component={GenderScreen} />
      <Stack.Screen name={navigator['goal']} component={GoalScreen} />
      <Stack.Screen name={navigator['height']} component={HeightScreen} />
      <Stack.Screen name={navigator['weight']} component={WeightScreen} />
      <Stack.Screen name={navigator['old']} component={OldScreen} />
      <Stack.Screen name={navigator['level']} component={LevelScreen} />
      <Stack.Screen name={navigator['start']} component={StartScreen} />
      <Stack.Screen
        name={navigator['goal-weight']}
        component={GoalWeightScreen}
      />
    </Stack.Navigator>
  );
};
export default RegisterNavigator;
