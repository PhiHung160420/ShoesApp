import {GET_ORDER_HISTORY} from '../actions/actionType';

const initialState = {
  ordersHistory: [],
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return {...state, ordersHistory: action.payload};
    default:
      return state;
  }
};

export default OrderReducer;
