import {typeAction} from '../actions/actionType';

const {GET_ORDER_HISTORY} = typeAction.orderActions;

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
