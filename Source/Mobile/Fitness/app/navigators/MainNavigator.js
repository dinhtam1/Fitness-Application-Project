import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import ProfileNavigator from './ProfileNavigator';
import {
  CategoryScreen,
  ChangePassword,
  CreatePlanScreen,
  DashboardScreen,
  DetailExerciseScreen,
  DetailMealScreen,
  FinishExerciseScreen,
  FullExerciseScreen,
  MealPlanScreen,
  NotificationScreen,
  PlaylistFullExerciseScreen,
  PlaylistScreen,
  ProgressExerciseScreen,
  ProgressScreen,
  ResultScreen,
  SettingScreen,
  SleepScreen,
} from '../screens';
import {navigator} from '../constants/text';

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={navigator['main']} component={DrawerNavigator} />
      <Stack.Screen
        name={navigator['full-exercise']}
        component={FullExerciseScreen}
      />
      <Stack.Screen name={navigator['category']} component={CategoryScreen} />
      <Stack.Screen
        name={navigator['detail-exercise']}
        component={DetailExerciseScreen}
      />
      <Stack.Screen
        name={navigator['detail-meal']}
        component={DetailMealScreen}
      />
      <Stack.Screen
        name={navigator['progress-exercise']}
        component={ProgressExerciseScreen}
      />
      <Stack.Screen name={navigator['result']} component={ResultScreen} />
      <Stack.Screen name={navigator['meal-plan']} component={MealPlanScreen} />
      <Stack.Screen
        name={navigator['notification']}
        component={NotificationScreen}
      />
      <Stack.Screen name={navigator['dashboard']} component={DashboardScreen} />
      <Stack.Screen name={navigator['playlist']} component={PlaylistScreen} />
      <Stack.Screen name={navigator['setting']} component={SettingScreen} />
      <Stack.Screen name={navigator['profile']} component={ProfileNavigator} />
      <Stack.Screen name={navigator['sleep']} component={SleepScreen} />
      <Stack.Screen name={navigator['progress']} component={ProgressScreen} />
      <Stack.Screen
        name={navigator['change-password']}
        component={ChangePassword}
      />
      <Stack.Screen
        name={navigator['create-plan']}
        component={CreatePlanScreen}
      />
      <Stack.Screen
        name={navigator['exercises-in-list']}
        component={PlaylistFullExerciseScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
