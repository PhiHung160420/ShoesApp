import {GET_ALL_CATEGORY, GET_PRODUCT_BY_CATEGORY} from '../actions/actionType';

const initialState = {
  listCategory: [],
  listProductByCate: [],
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return {...state, listCategory: action.payload};
    case GET_PRODUCT_BY_CATEGORY:
      return {...state, listProductByCate: action.payload};
    default:
      return state;
  }
};

export default CategoryReducer;
