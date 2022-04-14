import {getProfileAPI} from '../../services/profileAPI';
import {typeAction} from './actionType';

const {GET_ORDER_HISTORY} = typeAction.orderActions;

export const getOrderHistoryAction = payload => {
  return {
    type: GET_ORDER_HISTORY,
    payload,
  };
};

export const fetchOrderHistoryAction = token => {
  return dispatch => {
    return getProfileAPI(token).then(res => {
      const orderHistory = res.data.content.ordersHistory;
      dispatch(getOrderHistoryAction(orderHistory));
    });
  };
};
