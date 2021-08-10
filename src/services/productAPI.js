import axios from 'axios';
import {apiUrl} from '../utils/urlConst';

export const getAllProduct = () => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/Product`,
  });
};

export const getProductByIdAPI = id => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/Product/getbyid?id=${id}`,
  });
};

export const likeProductAPI = (productId, token) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/Users/like?productId=${productId}`,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const unLikeProductAPI = (productId, token) => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/Users/unlike?productId=${productId}`,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getProductsFavoriteFromAPI = token => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/Users/getproductfavorite`,
    headers: {Authorization: `Bearer ${token}`},
  });
};
