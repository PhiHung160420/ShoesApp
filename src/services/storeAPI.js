import axios from 'axios';
import { CONSTANST } from '../constants';

export const getAllStoreAPI = () => {
  return axios({
    method: 'GET',
    url: `${CONSTANST?.backend_url}/Product/getAllStore`,
  });
};
