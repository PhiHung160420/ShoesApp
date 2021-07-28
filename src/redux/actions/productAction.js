import {SET_PRODUCTS_FAVORITE, REMOVE_PRODUCTS_FAVORITE} from './actionType';

export const hanlderSetProductFavorite = data => {
  return {
    type: SET_PRODUCTS_FAVORITE,
    payload: data,
  };
};
