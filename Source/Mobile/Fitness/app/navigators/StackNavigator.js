import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Entypo} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  ForgotScreen,
  GoalScreen,
  GoalWeightScreen,
  HeightScreen,
  HomePageScreen,
  IntroduceScreen,
  LevelScreen,
  OldScreen,
  SignInScreen,
  SignUpScreen,
  SplashScreen,
  StartScreen,
  VerifyScreen,
  WeightScreen,
  FullExerciseScreen,
  CategoryScreen,
  ChangePassword,
  DetailExerciseScreen,
  DetailMealScreen,
  GenderScreen,
} from '../screens';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomePageScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Meal"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Meal',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="fast-food" size={24} color="black" />
              ) : (
                <Ionicons name="fast-food-outline" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Camera',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="camera" size={24} color="black" />
              ) : (
                <Ionicons name="camera-outline" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <FontAwesome5 name="user-alt" size={24} color="black" />
              ) : (
                <FontAwesome5 name="user" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Introduce"
          component={IntroduceScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Weight"
          component={WeightScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Old"
          component={OldScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Gender"
          component={GenderScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Height"
          component={HeightScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Goal"
          component={GoalScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Level"
          component={LevelScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GoalWeight"
          component={GoalWeightScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Verify"
          component={VerifyScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FullExercise"
          component={FullExerciseScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomePageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailExercise"
          component={DetailExerciseScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailMeal"
          component={DetailMealScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
