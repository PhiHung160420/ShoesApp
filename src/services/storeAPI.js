import axios from 'axios';
import {BACKEND_URL} from '../constants/url.constants';

export const getAllStoreAPI = () => {
  return axios({
    method: 'GET',
    url: `${BACKEND_URL}/Product/getAllStore`,
  });
};
