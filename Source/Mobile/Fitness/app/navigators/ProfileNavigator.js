import {createStackNavigator} from '@react-navigation/stack';
import {EditProfileScreen, ProfileScreen} from '../screens';

const ProfileNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileUser" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};
export default ProfileNavigator;
