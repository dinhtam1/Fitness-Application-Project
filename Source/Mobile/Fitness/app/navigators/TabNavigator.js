import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import {colors} from '../constants/colors';
import TextComponent from '../components/text/textComponent';
import React, {ReactNode} from 'react';
import {Entypo} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {HomePageSceen} from '../screens';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors['background-white'],
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabel({focused}) {
          return route.name === 'Home' ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? colors['title'] : colors['icon-blur']}
              styles={{marginBottom: Platform.OS === 'android' ? 12 : 0}}
            />
          );
        },
        tabBarIcon: ({focused}) => {
          let icon;
          switch (route.name) {
            case 'Home':
              icon = focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <Entypo name="home" size={24} color="#BDBDBD" />
              );
              break;
            case 'Meal':
              icon = focused ? (
                <Ionicons name="fast-food" size={24} color="#008E97" />
              ) : (
                <Ionicons name="fast-food-outline" size={24} color="#BDBDBD" />
              );
              break;
            case 'Camera':
              icon = focused ? (
                <Ionicons name="camera" size={24} color="#008E97" />
              ) : (
                <Ionicons name="camera-outline" size={24} color="#BDBDBD" />
              );
              break;
            case 'Profile':
              icon = focused ? (
                <FontAwesome5 name="user-alt" size={24} color="#008E97" />
              ) : (
                <FontAwesome5 name="user-alt" size={24} color="#BDBDBD" />
              );
              break;
          }
          return icon;
        },
      })}>
      <Tab.Screen name="Home" component={HomePageSceen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
