import axios from 'axios';
import {apiUrl} from '../utils/urlConst';

export const getAllStoreAPI = () => {
  return axios({
    method: 'GET',
    url: `${apiUrl}/Product/getAllStore`,
  });
};
