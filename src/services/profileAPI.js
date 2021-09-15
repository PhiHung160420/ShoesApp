import axios from 'axios';
import {BACKEND_URL} from '../constants/url.constants';

// api get profile info
export const getProfileAPI = token => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/Users/getProfile`,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const updateProfileAPI = (data, token) => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/Users/updateProfile`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};

export const changePasswordAPI = (data, token) => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/Users/changePassword`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};

export const uploadAvatarAPI = (formData, token) => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/Users/uploadavatar`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;',
    },
    data: formData,
  });
};
