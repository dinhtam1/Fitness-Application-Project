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

const RegisterNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Height" component={HeightScreen} />
      <Stack.Screen name="Weight" component={WeightScreen} />
      <Stack.Screen name="Old" component={OldScreen} />
      <Stack.Screen name="Level" component={LevelScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="GoalWeight" component={GoalWeightScreen} />
    </Stack.Navigator>
  );
};
export default RegisterNavigator;
