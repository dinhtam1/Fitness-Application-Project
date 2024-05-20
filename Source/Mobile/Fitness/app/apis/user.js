import axios from '../config/axios';

export const apiChangePassword = data =>
  axios({
    url: '/v1/api/auth/forgot-password',
    method: 'put',
    data,
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
