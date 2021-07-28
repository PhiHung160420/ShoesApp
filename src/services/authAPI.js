import axios from 'axios';
import {apiUrl} from '../utils/urlConst';

// api sign in
export const useSignIn = data => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/signin`,
    data,
  });
};

// api sign up
export const useSignUp = data => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/signup`,
    data,
  });
};
