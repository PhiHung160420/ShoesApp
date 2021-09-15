import axios from 'axios';
import {BACKEND_URL} from '../constants/url.constants';

export const getAllProduct = () => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}/Product`,
  });
};

export const getProductByIdAPI = id => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}/Product/getbyid?id=${id}`,
  });
};

export const likeProductAPI = (productId, token) => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}/Users/like?productId=${productId}`,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const unLikeProductAPI = (productId, token) => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}/Users/unlike?productId=${productId}`,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getProductsFavoriteFromAPI = token => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}/Users/getproductfavorite`,
    headers: {Authorization: `Bearer ${token}`},
  });
};
