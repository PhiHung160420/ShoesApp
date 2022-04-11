import axios from 'axios';
import { CONSTANST } from '../constants';

export const useSignIn = data => {
  return axios({
    method: 'POST',
    url: `${CONSTANST?.backend_url}/Users/signin`,
    data,
  });
};

export const useSignUp = data => {
  return axios({
    method: 'POST',
    url: `${CONSTANST?.backend_url}/Users/signup`,
    data,
  });
};
