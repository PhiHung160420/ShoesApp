import axios from 'axios';
import {CONSTANST} from '../constants';

export const getProfileAPI = token => {
  return axios({
    method: 'POST',
    url: `${CONSTANST.backend_url}/Users/getProfile`,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const updateProfileAPI = (data, token) => {
  return axios({
    method: 'POST',
    url: `${CONSTANST.backend_url}/Users/updateProfile`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};

export const changePasswordAPI = (data, token) => {
  return axios({
    method: 'POST',
    url: `${CONSTANST.backend_url}/Users/changePassword`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};

export const uploadAvatarAPI = (formData, token) => {
  return axios({
    method: 'POST',
    url: `${CONSTANST.backend_url}/Users/uploadavatar`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;',
    },
    data: formData,
  });
};
