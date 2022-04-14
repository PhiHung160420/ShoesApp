import {getAllProductAPI, getProductByIdAPI, getProductsFavoriteFromAPI} from '../../services/productAPI';
import {typeAction} from './actionType';

const {GET_ALL_PRODUCT, GET_PRODUCT_BY_ID, SAVE_PRODUCTS_FAVORITE, REMOVE_ALL_PRDUCTS_FAVORITE} = typeAction.productActions;

export const getAllProductAction = payload => {
  return {
    type: GET_ALL_PRODUCT,
    payload,
  };
};

export const getProductByIdAction = payload => {
  return {
    type: GET_PRODUCT_BY_ID,
    payload,
  };
};

export const saveProductFavoriteAction = payload => {
  return {
    type: SAVE_PRODUCTS_FAVORITE,
    payload,
  };
};

export const fetchAllProductAction = () => {
  return dispatch => {
    getAllProductAPI()
      .then(res => {
        dispatch(getAllProductAction(res.data.content));
      })
      .catch(err => console.log(err));
  };
};

export const fetchProductByIdAction = productId => {
  return dispatch => {
    getProductByIdAPI(productId)
      .then(res => {
        dispatch(getProductByIdAction(res.data.content));
      })
      .catch(err => console.log(err));
  };
};

export const fetchProductsFavoriteAction = token => {
  return dispatch => {
    getProductsFavoriteFromAPI(token)
      .then(res => {
        dispatch(saveProductFavoriteAction(res?.data?.content?.productsFavorite));
      })
      .catch(err => console.log(err));
  };
};
