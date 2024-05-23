import axios from '../config/axios';

export const apiCategory = (userId, token) =>
  axios({
    url: '/v1/api/exercise/category',
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });

export const apiExercises = (userId, token, params) =>
  axios({
    url: '/v1/api/exercise',
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
    params: params,
  });

export const apiMuscleName = (userId, token) =>
  axios({
    url: '/v1/api/exercise/muscle_name',
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });

export const apiExerciseDetail = (userId, token, id) =>
  axios({
    url: `/v1/api/exercise/${id}`,
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });


