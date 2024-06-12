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

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen name="FullExercise" component={FullExerciseScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="DetailExercise" component={DetailExerciseScreen} />
      <Stack.Screen name="DetailMeal" component={DetailMealScreen} />
      <Stack.Screen
        name="ProgressExercise"
        component={ProgressExerciseScreen}
      />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="MealPlan" component={MealPlanScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Profile" component={ProfileNavigator} />
      <Stack.Screen name="Sleep" component={SleepScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="CreatePlan" component={CreatePlanScreen} />
      <Stack.Screen
        name="ExercisesInList"
        component={PlaylistFullExerciseScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
