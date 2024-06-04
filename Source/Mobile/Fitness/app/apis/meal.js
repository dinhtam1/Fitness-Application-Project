import axios from '../config/axios';

export const apiMeal = (userId, token, params) =>
  axios({
    url: '/v1/api/meal',
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
    params,
  });

export const apiDetailMeal = (userId, token, mealId) =>
  axios({
    url: `/v1/api/meal/${mealId}`,
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });

export const apiNutrition = (userId, token, data) => {
  return axios({
    url: '/v1/api/meal/nutrition',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
      'x-client-id': userId,
      Accept: 'multipart/form-data',
    },
  });
};
