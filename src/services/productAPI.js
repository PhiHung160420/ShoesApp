import axios from 'axios';

export const getAllProduct = () => {
  return axios({
    method: 'GET',
    url: 'http://svcy3.myclass.vn/api/Product',
  });
};

export const getProductById = id => {
  return axios({
    method: 'GET',
    url: `http://svcy3.myclass.vn/api/Product/getbyid?id=${id}`,
  });
};

export const likeProduct = (productId, token) => {
  return axios({
    method: 'GET',
    url: `http://svcy3.myclass.vn/api/Users/like?productId=${productId}`,
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const getProductsFavoriteFromAPI = token => {
  return axios({
    method: 'GET',
    url: 'http://svcy3.myclass.vn/api/Users/getproductfavorite',
    headers: {Authorization: `Bearer ${token}`},
  });
};
