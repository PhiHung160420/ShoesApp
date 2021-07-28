import axios from 'axios';
import {apiUrl} from '../utils/urlConst';

// api get profile info
export const getProfile = token => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/getProfile`,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const updateProfile = (data, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/updateProfile`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};

export const changePassword = (data, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/changePassword`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};

export const uploadAvatar = (formData, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/uploadavatar`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;',
    },
    data: formData,
  });
};
