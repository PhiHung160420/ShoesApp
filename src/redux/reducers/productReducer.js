import {SET_PRODUCTS_FAVORITE} from '../actions/actionType';

const initialState = {
  productsFavorite: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS_FAVORITE:
      return {...state, productsFavorite: action.payload};
    default:
      return state;
  }
};

export default ProductReducer;
