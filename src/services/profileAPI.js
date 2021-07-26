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

export const changePassword = (data, token) => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/changePassword',
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};

export const uploadAvatar = (formData, token) => {
  return axios({
    method: 'POST',
    url: 'http://svcy3.myclass.vn/api/Users/uploadavatar',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;',
    },
    data: formData,
  });
};
