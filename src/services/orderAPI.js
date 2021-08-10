import axios from 'axios';
import {apiUrl} from '../utils/urlConst';

export const submitOrderAPI = data => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/order`,
    data,
  });
};

export const deleteOrderAPI = (data, token) => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/deleteOrder`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};
