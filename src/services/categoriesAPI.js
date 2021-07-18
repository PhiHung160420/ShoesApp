import axios from 'axios';

export const getAllCategoriesAPI = () => {
  return axios({
    method: 'GET',
    url: 'http://svcy3.myclass.vn/api/Product/getAllCategory',
  });
};

export const getProductByCategory = categoryId => {
  return axios({
    method: 'GET',
    url: `http://svcy3.myclass.vn/api/Product/getProductByCategory?categoryId=${categoryId}`,
  });
};
