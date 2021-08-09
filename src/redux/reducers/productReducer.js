import {GET_ALL_PRODUCT, SET_PRODUCTS_FAVORITE} from '../actions/actionType';

const initialState = {
  listProducts: [],
  productsFavorite: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS_FAVORITE:
      return {...state, productsFavorite: action.payload};
    case GET_ALL_PRODUCT:
      return {...state, listProducts: action.payload};
    default:
      return state;
  }
};

export default ProductReducer;
