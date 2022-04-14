import {
  getAllCategoriesAPI,
  getProductByCategoryAPI,
} from '../../services/categoriesAPI';
import {typeAction} from './actionType';

const {GET_ALL_CATEGORY, GET_PRODUCT_BY_CATEGORY} = typeAction.categoryActions;

export const getAllCategoryAction = payload => {
  return {
    type: GET_ALL_CATEGORY,
    payload,
  };
};

export const getProductByCategoryAction = payload => {
  return {
    type: GET_PRODUCT_BY_CATEGORY,
    payload,
  };
};

export const fetchAllCategoryAction = () => {
  return dispatch => {
    getAllCategoriesAPI()
      .then(res => {
        dispatch(getAllCategoryAction(res?.data?.content));
      })
      .catch(err => console.log(err));
  };
};

export const fetchProductByCategoryAction = categoryId => {
  return dispatch => {
    getProductByCategoryAPI(categoryId)
      .then(res => {
        dispatch(getProductByCategoryAction(res?.data?.content));
      })
      .catch(err => console.log(err));
  };
};
