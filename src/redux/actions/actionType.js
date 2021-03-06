export const typeAction = {
  themeActions: {
    TOGGLE_THEME_BEGIN: 'TOGGLE_THEME_BEGIN',
    TOGGLE_THEME_SUCCESS: 'TOGGLE_THEME_SUCCESS',
    TOGGLE_THEME_FAILURE: 'TOGGLE_THEME_FAILURE',
  },
  authActions: {
    SET_ACCESS_TOKEN: 'SET_ACCESS_TOKEN',
    REMOVE_ACCESS_TOKEN: 'REMOVE_ACCESS_TOKEN',
  },
  profileActions: {
    SET_PROFILE: 'SET_PROFILE',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
  },
  productActions: {
    GET_ALL_PRODUCT: 'GET_ALL_PRODUCT',
    GET_PRODUCT_BY_ID: 'GET_PRODUCT_BY_ID',
    SAVE_PRODUCTS_FAVORITE: 'SAVE_PRODUCTS_FAVORITE',
  },
  cartActions: {
    ADD_TO_CART: 'ADD_TO_CART',
    INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
    DECREMENT_QUANTITY: 'DECREMENT_QUANTITY',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    GET_NUMBER_CART: 'GET_NUMBER_CART',
    SET_CART: 'SET_CART',
    REMOVE_ALL_CART: 'REMOVE_ALL_CART',
  },
  loadingActions: {
    LOADING: 'LOADING',
  },
  categoryActions: {
    GET_ALL_CATEGORY: 'GET_ALL_CATEGORY',
    GET_PRODUCT_BY_CATEGORY: 'GET_PRODUCT_BY_CATEGORY',
  },
  orderActions: {
    GET_ORDER_HISTORY: 'GET_ORDER_HISTORY',
  },
};
