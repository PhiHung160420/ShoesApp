import axios from 'axios';
import { CONSTANST } from '../constants';

export const submitOrderAPI = data => {
  return axios({
    method: 'POST',
    url: `${CONSTANST?.backend_url}/Users/order`,
    data,
  });
};

export const deleteOrderAPI = (data, token) => {
  return axios({
    method: 'POST',
    url: `${CONSTANST?.backend_url}/Users/deleteOrder`,
    headers: {Authorization: `Bearer ${token}`},
    data,
  });
};
