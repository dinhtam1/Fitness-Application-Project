import axios from '../config/axios';

export const apiChangePassword = (userId, token, data) =>
  axios({
    url: '/v1/api/auth/forgot-password',
    method: 'put',
    data,
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });

export const apiUpdateProfile = (data, userId, token) =>
  axios({
    url: '/v1/api/user/me',
    method: 'put',
    data,
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });

export const apiGetMe = (userId, token) =>
  axios({
    url: '/v1/api/user/me',
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });
