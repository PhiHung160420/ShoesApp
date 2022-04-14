import {typeAction} from '../actions/actionType';

const {GET_ALL_PRODUCT, GET_PRODUCT_BY_ID, SAVE_PRODUCTS_FAVORITE} =
  typeAction.productActions;

const initialState = {
  listProducts: [],
  productsFavorite: [],
  productById: {},
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PRODUCTS_FAVORITE:
      return {...state, productsFavorite: action.payload};
    case GET_ALL_PRODUCT:
      return {...state, listProducts: action.payload};
    case GET_PRODUCT_BY_ID:
      return {...state, productById: action.payload};
    default:
      return state;
  }
};

export default ProductReducer;
