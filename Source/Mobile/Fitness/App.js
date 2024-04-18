import {SignInScreen} from './app/screens';
import {useFonts} from 'expo-font';
import {useEffect} from 'react';
import {View} from 'react-native';
import SignUpScreen from './app/screens/auth/SignUpScreen';
import ForgotScreen from './app/screens/auth/ForgotScreen';

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
  useEffect(() => {
    if (error) throw error;
    // if (fontsLoaded) {
    //   SplashScreen.hideAsync();
    // }
  }, [fontsLoaded, error]);
  if (!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;
  return (
    <View>
      <ForgotScreen />
    </View>
  );
}
