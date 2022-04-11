import {getAllProduct, getProductByIdAPI} from '../../services/productAPI';
import {typeAction} from './actionType';

const {GET_ALL_PRODUCT, GET_PRODUCT_BY_ID, SET_PRODUCTS_FAVORITE} =
  typeAction.productActions;

export const handleGetAllProduct = payload => {
  return {
    type: GET_ALL_PRODUCT,
    payload,
  };
};

export const handleGetProductById = payload => {
  return {
    type: GET_PRODUCT_BY_ID,
    payload,
  };
};

export const hanldeSetProductFavorite = payload => {
  return {
    type: SET_PRODUCTS_FAVORITE,
    payload,
  };
};

export const actFetchGetAllProductRequest = () => {
  return dispatch => {
    getAllProduct()
      .then(res => {
        dispatch(handleGetAllProduct(res.data.content));
      })
      .catch(err => console.log(err));
  };
};

export const actFetchGetProductByIdRequest = productId => {
  return dispatch => {
    getProductByIdAPI(productId)
      .then(res => {
        dispatch(handleGetProductById(res.data.content));
      })
      .catch(err => console.log(err));
  };
};
