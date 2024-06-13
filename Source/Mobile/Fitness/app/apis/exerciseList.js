import axios from '../config/axios';

export const apiCreatePlan = (userId, token, data) =>
  axios({
    url: '/v1/api/exercise-list/',
    method: 'post',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
    data,
  });

export const apiGetAllLists = (userId, token, params) =>
  axios({
    url: '/v1/api/exercise-list',
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
    params,
  });
export const apiAddExercise = (userId, token, data) =>
  axios({
    url: '/v1/api/exercise-list/add-list',
    method: 'post',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
    data,
  });

export const apiExerciseInList = (userId, token, id) =>
  axios({
    url: `/v1/api/exercise-list/${id}`,
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });

export const apiDeletePlaylist = (userId, token, id) =>
  axios({
    url: `/v1/api/exercise-list/${id}`,
    method: 'get',
    headers: {
      Authorization: token,
      'x-client-id': userId,
    },
  });
