import axios from '../config/axios';

export const apiLogin = data =>
  axios({
    url: '/v1/api/auth/sign-in',
    method: 'post',
    data,
  });

export const apiRegister = async data =>
  axios({
    url: '/v1/api/auth/sign-up',
    method: 'post',
    data,
  });
export const apiSendOTP = async data =>
  axios({
    url: '/v1/api/auth/send-otp',
    method: 'post',
    data,
  });

export const apiVerifyOTP = async data =>
  axios({
    url: '/v1/api/auth/verify-otp',
    method: 'post',
    data,
  });
