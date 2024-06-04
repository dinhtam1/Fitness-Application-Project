import {createStackNavigator} from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import ProfileNavigator from './ProfileNavigator';
import {
  CategoryScreen,
  DashboardScreen,
  DetailExerciseScreen,
  DetailMealScreen,
  FullExerciseScreen,
  MealPlanScreen,
  NotificationScreen,
  ProgressExerciseScreen,
  ProgressScreen,
  ResultScreen,
  SettingScreen,
  SleepScreen,
  TrainingScreen,
} from '../screens';

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
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
      <Stack.Screen name="Training" component={TrainingScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Profile" component={ProfileNavigator} />
      <Stack.Screen name="Sleep" component={SleepScreen} />
      <Stack.Screen name="Progress" component={ProgressScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
