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
