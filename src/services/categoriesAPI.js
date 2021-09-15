import axios from 'axios';
import {BACKEND_URL} from '../constants/url.constants';

export const getAllCategoriesAPI = () => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}/Product/getAllCategory`,
  });
};

export const getProductByCategoryAPI = categoryId => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}/Product/getProductByCategory?categoryId=${categoryId}`,
  });
};
