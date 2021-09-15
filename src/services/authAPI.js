import axios from 'axios';
import {BACKEND_URL} from '../constants/url.constants';

// api sign in
export const useSignIn = data => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/Users/signin`,
    data,
  });
};

// api sign up
export const useSignUp = data => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/Users/signup`,
    data,
  });
};
