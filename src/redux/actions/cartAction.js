import {typeAction} from './actionType';

const {
  ADD_TO_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  REMOVE_FROM_CART,
  GET_NUMBER_CART,
  SET_CART,
  REMOVE_ALL_CART,
} = typeAction.cartActions;

export const saveCartAction = payload => {
  return {
    type: SET_CART,
    payload,
  };
};

export const removeAllCartsAction = payload => {
  return {
    type: REMOVE_ALL_CART,
    payload,
  };
};

export const getNumberCart = payload => {
  return {
    type: GET_NUMBER_CART,
    payload,
  };
};

export const addProductToCartAction = payload => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const incrementQuantityAction = payload => {
  return {
    type: INCREMENT_QUANTITY,
    payload,
  };
};

export const decrementQuantityAction = payload => {
  return {
    type: DECREMENT_QUANTITY,
    payload,
  };
};

export const removeFromCartAction = payload => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};
