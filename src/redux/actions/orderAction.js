import {getProfileAPI} from '../../services/profileAPI';
import {typeAction} from './actionType';

const {GET_ORDER_HISTORY} = typeAction.orderActions;

export const handlerGetOrderHistory = payload => {
  return {
    type: GET_ORDER_HISTORY,
    payload,
  };
};

export const actFetchOrderHistoryRequest = token => {
  return dispatch => {
    return getProfileAPI(token).then(res => {
      const orderHistory = res.data.content.ordersHistory;
      dispatch(handlerGetOrderHistory(orderHistory));
    });
  };
};
