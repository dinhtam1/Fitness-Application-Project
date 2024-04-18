import axios from 'axios';

export const apiLogin = data => {
  axios({
    url: '/auth/login',
    method: 'post',
    data,
  });
};
