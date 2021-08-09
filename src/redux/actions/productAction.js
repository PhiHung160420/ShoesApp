import {getAllProduct, getProductByIdAPI} from '../../services/productAPI';
import {
  GET_ALL_PRODUCT,
  GET_PRODUCT_BY_ID,
  SET_PRODUCTS_FAVORITE,
} from './actionType';

export const handlerGetAllProduct = payload => {
  return {
    type: GET_ALL_PRODUCT,
    payload,
  };
};

export const handlerGetProductById = payload => {
  return {
    type: GET_PRODUCT_BY_ID,
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

export const actFetchGetProductByIdRequest = productId => {
  return dispatch => {
    getProductByIdAPI(productId)
      .then(res => {
        dispatch(handlerGetProductById(res.data.content));
      })
      .catch(err => console.log(err));
  };
};
