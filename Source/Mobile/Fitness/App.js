import {useCallback} from 'react';
import StackNavigator from './app/navigators/StackNavigator';
import {useFonts} from 'expo-font';
import * as splashScreen from 'expo-splash-screen';
// splashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    'Poppins-Bold': require('./app/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./app/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./app/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./app/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('./app/assets/fonts/Poppins-Light.ttf'),
    'Poppins-ExtraLight': require('./app/assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraBold': require('./app/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Black': require('./app/assets/fonts/Poppins-Black.ttf'),
    'Poppins-Thin': require('./app/assets/fonts/Poppins-Thin.ttf'),
    'BeBasNeue-Regular': require('./app/assets/fonts/BebasNeue-Regular.ttf'),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await splashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded || fontError) {
    return null;
  }
  return (
    <>
      <StackNavigator />
    </>
  );
}
