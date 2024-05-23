import axios from '../config/axios';

export const apiDashboard = (userId, token) =>
  axios({
    url: `/v1/api/dashboard`,
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });

export const apiUpdateDashboard = (userId, token, data) =>
  axios({
    url: `/v1/api/dashboard`,
    method: 'put',
    data,
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });
