import {
  getAllCategoriesAPI,
  getProductByCategoryAPI,
} from '../../services/categoriesAPI';
import {typeAction} from './actionType';

const {GET_ALL_CATEGORY, GET_PRODUCT_BY_CATEGORY} = typeAction.categoryActions;

export const handlerGetAllCategory = payload => {
  return {
    type: GET_ALL_CATEGORY,
    payload,
  };
};

export const handlerGetProductByCategory = payload => {
  return {
    type: GET_PRODUCT_BY_CATEGORY,
    payload,
  };
};

export const actFetchGetAllCategoryRequest = () => {
  return dispatch => {
    getAllCategoriesAPI()
      .then(res => {
        dispatch(handlerGetAllCategory(res.data.content));
      })
      .catch(err => console.log(err));
  };
};

export const actFetchGetProductByCategoryRequest = categoryId => {
  return dispatch => {
    getProductByCategoryAPI(categoryId)
      .then(res => {
        dispatch(handlerGetProductByCategory(res.data.content));
      })
      .catch(err => console.log(err));
  };
};
