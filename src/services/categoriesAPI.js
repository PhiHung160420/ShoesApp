import axios from 'axios';
import {CONSTANST} from '../constants';

export const getAllCategoriesAPI = () => {
  return axios({
    method: 'GET',
    url: `${CONSTANST?.backend_url}/Product/getAllCategory`,
  });
};

export const getProductByCategoryAPI = categoryId => {
  return axios({
    method: 'GET',
    url: `${CONSTANST?.backend_url}/Product/getProductByCategory?categoryId=${categoryId}`,
  });
};
