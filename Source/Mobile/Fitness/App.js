import {SignInScreen} from './app/screens';
import {useFonts} from 'expo-font';
import {View} from 'react-native';
import SignUpScreen from './app/screens/auth/signUpScreen';
import ForgotScreen from './app/screens/auth/forgotScreen';
import StackNavigator from './app/navigators/StackNavigator';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('./app/assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./app/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./app/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('./app/assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('./app/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./app/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./app/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./app/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('./app/assets/fonts/Poppins-Thin.ttf'),
  });
  return (
    <>
      <StackNavigator />
    </>
  );
}
