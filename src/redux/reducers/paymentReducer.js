import {SAVE_INFO_PAYMENT} from '../actions/actionType';
const initialState = {
  infoPayment: {},
};

const PaymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_INFO_PAYMENT:
      return {...state, infoPayment: action.payload};

    default:
      return state;
  }
};

export default PaymentReducer;
