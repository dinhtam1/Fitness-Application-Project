import axios from '../config/axios';

export const apiChangePassword = data =>
  axios({
    url: '/v1/api/auth/forgot-password',
    method: 'put',
    data,
  });
