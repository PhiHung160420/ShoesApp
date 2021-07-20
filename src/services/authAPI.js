import axios from 'axios';

// api sign in
export const useSignIn = data => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/signin',
    data,
  });
};

// api sign up
export const useSignUp = data => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/signup',
    data,
  });
};

// api get profile info
export const getProfile = token => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/getProfile',
    headers: {Authorization: `Bearer ${token}`},
  });
};
