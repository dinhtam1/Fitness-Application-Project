import {useEffect, useState} from 'react';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import Toast from 'react-native-toast-message';
import SplashNavigator from './SplashNavigator';
import {useAuthStore, useUserStore} from '../store/useAuthStore';

const AppRoutes = () => {
  const {token, isShowSplash, isLogin} = useAuthStore();
  const {user, getUser} = useUserStore();

  // useEffect(() => {
  //   let timeout;

  //   if (token) {
  //     timeout = setTimeout(() => {
  //       getUser(user.userId, token);
  //     }, 2000);
  //   }

  //   return () => clearTimeout(timeout);
  // }, [token]);
  return (
    <>
      {isShowSplash ? (
        <SplashNavigator />
      ) : token && isLogin ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
      <Toast />
    </>
  );
};

export default AppRoutes;
