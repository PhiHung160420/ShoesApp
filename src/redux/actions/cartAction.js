import {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  GET_NUMBER_CART,
  SET_CARTS,
  REMOVE_ALL_CARTS,
} from './actionType';

export const setCarts = payload => {
  return {
    type: SET_CARTS,
    payload,
  };
};

export const removeAllCarts = payload => {
  return {
    type: REMOVE_ALL_CARTS,
    payload,
  };
};

export const getNumberCart = payload => {
  return {
    type: GET_NUMBER_CART,
    payload,
  };
};

export const addProductToCart = payload => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const incrementQuantity = payload => {
  return {
    type: INCREMENT_QUANTITY,
    payload,
  };
};

export const decrementQuantity = payload => {
  return {
    type: DECREMENT_QUANTITY,
    payload,
  };
};

export const removeFromCart = payload => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};
