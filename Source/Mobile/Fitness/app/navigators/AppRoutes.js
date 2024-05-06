import {useState} from 'react';
import {SplashScreen} from '../screens';
import AuthNavigator from './AuthNavigator';

const AppRoutes = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);
  return <>{isShowSplash ? <SplashScreen /> : <AuthNavigator />}</>;
};

export default AppRoutes;
