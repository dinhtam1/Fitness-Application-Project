import {createStackNavigator} from '@react-navigation/stack';
import {EditProfileScreen, ProfileScreen} from '../screens';
import {navigator} from '../constants/text';

const ProfileNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={navigator['profile-user']}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={navigator['edit-profile']}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};
export default ProfileNavigator;
