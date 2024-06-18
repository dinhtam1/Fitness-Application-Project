import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform} from 'react-native';
import {colors} from '../constants/colors';
import TextComponent from '../components/text/textComponent';
import {Entypo} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';
import {FontAwesome6} from '@expo/vector-icons';
import {
  CameraScreen,
  FullExerciseScreen,
  HomePageScreen,
  MealPlanScreen,
} from '../screens';
import {fontFamilies} from '../constants/fontFamilies';
import ProfileNavigator from './ProfileNavigator';
import {navigator} from '../constants/text';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => {
        return {
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 100 : 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors['background-white'],
            display: route.name === 'Camera' ? 'none' : 'flex',
          },
          tabBarIconStyle: {
            marginTop: 8,
          },
          tabBarLabelPosition: 'below-icon',
          tabBarLabel({focused}) {
            return route.name === 'Search' ? null : (
              <TextComponent
                text={route.name}
                flex={0}
                font={fontFamilies['medium']}
                size={14}
                color={focused ? colors['title'] : colors['color-bottom-tab']}
                styles={{
                  marginBottom: Platform.OS === 'ios' ? 6 : 0,
                }}
              />
            );
          },
          tabBarIcon: ({focused}) => {
            let icon;
            switch (route.name) {
              case 'Home':
                icon = focused ? (
                  <Entypo name="home" size={24} color="black" />
                ) : (
                  <AntDesign
                    name="home"
                    size={24}
                    color={colors['color-bottom-tab']}
                  />
                );
                break;
              case 'Meal':
                icon = focused ? (
                  <Ionicons name="fast-food" size={24} color="black" />
                ) : (
                  <Ionicons
                    name="fast-food-outline"
                    size={24}
                    color={colors['color-bottom-tab']}
                  />
                );
                break;
              case 'Camera':
                icon = focused ? (
                  <Ionicons name="camera" size={24} color="black" />
                ) : (
                  <Ionicons
                    name="camera-outline"
                    size={24}
                    color={colors['color-bottom-tab']}
                  />
                );
                break;
              case 'Exercise':
                icon = focused ? (
                  <FontAwesome6 name="dumbbell" size={24} color="black" />
                ) : (
                  <FontAwesome6
                    name="dumbbell"
                    size={24}
                    color={colors['color-bottom-tab']}
                  />
                );
                break;
              case 'Profile':
                icon = focused ? (
                  <FontAwesome5 name="user-alt" size={24} color="black" />
                ) : (
                  <FontAwesome5
                    name="user"
                    size={24}
                    color={colors['color-bottom-tab']}
                  />
                );
                break;
            }
            return icon;
          },
        };
      }}>
      <Tab.Screen name={navigator['home']} component={HomePageScreen} />
      <Tab.Screen name={navigator['meal']} component={MealPlanScreen} />
      <Tab.Screen name={navigator['camera']} component={CameraScreen} />
      <Tab.Screen
        name={navigator['exercise']}
        component={FullExerciseScreen}
        initialParams={{category: 'Dumbbells'}}
      />
      <Tab.Screen name={navigator['profile']} component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
