import axios from 'axios';
import { CONSTANST } from '../constants';

export const loginAPI = data => {
  return axios({
    method: 'POST',
    url: `${CONSTANST?.backend_url}/Users/signin`,
    data,
  });
};

export const registerAPI = data => {
  return axios({
    method: 'POST',
    url: `${CONSTANST?.backend_url}/Users/signup`,
    data,
  });
};
