import axios from '../config/axios';

export const apiDashboard = (userId, token, params) =>
  axios({
    url: `/v1/api/dashboard`,
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
    params,
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

export const apiStatistic = (userId, token, params) =>
  axios({
    url: `/v1/api/statistic`,
    method: 'get',
    params: params,
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });
