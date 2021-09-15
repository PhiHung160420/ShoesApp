import axios from 'axios';
import {BACKEND_URL} from '../constants/url.constants';

export const submitOrderAPI = data => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/Users/order`,
    data,
  });
};

export const deleteOrderAPI = (data, token) => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/Users/deleteOrder`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};
