import axios from 'axios';

export const useSignIn = data => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/signin',
    data,
  });
};

export const useSignUp = data => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/signup',
    data,
  });
};
