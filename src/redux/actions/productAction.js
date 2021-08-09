import {getAllProduct} from '../../services/productAPI';
import {
  GET_ALL_PRODUCT,
  SET_PRODUCTS_FAVORITE,
  REMOVE_PRODUCTS_FAVORITE,
} from './actionType';

export const handlerGetAllProduct = payload => {
  return {
    type: GET_ALL_PRODUCT,
    payload,
  };
};

export const hanlderSetProductFavorite = payload => {
  return {
    type: SET_PRODUCTS_FAVORITE,
    payload,
  };
};

export const actFetchGetAllProductRequest = () => {
  return dispatch => {
    getAllProduct()
      .then(res => {
        dispatch(handlerGetAllProduct(res.data.content));
      })
      .catch(err => console.log(err));
  };
};
