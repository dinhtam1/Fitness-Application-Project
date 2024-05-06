import axios from '../config/axios';

export const apiLogin = data =>
  axios({
    url: '/auth/sign-in',
    method: 'post',
    data,
  });

export const apiRegister = async data =>
  axios({
    url: '/auth/sign-up',
    method: 'post',
    data,
  });

export const apiRefreshToken = data =>
  axios({
    url: '/auth/login',
    method: 'post',
    data,
  });
