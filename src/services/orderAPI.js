import axios from 'axios';
import {apiUrl} from '../utils/urlConst';

export const submitOrder = data => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/order`,
    data,
  });
};

export const deleteOrder = orderId => {
  return axios({
    method: 'POST',
    url: `${apiUrl}/Users/deleteOrder`,
    orderId,
  });
};
