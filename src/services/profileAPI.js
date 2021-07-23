import axios from 'axios';

// api get profile info
export const getProfile = token => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/getProfile',
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const updateProfile = (data, token) => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/updateProfile',
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};
