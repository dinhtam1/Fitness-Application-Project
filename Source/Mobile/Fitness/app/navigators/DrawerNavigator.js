import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerCustom from '../components/common/drawerCustom';
import TabNavigation from './TabNavigation';
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
      drawerContent={props => <DrawerCustom {...props} />}>
      <Drawer.Screen name="TabNavigator" component={TabNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
