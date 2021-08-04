import {getProfile} from '../../services/profileAPI';
import {GET_ORDER_HISTORY} from './actionType';

export const handlerGetOrderHistory = payload => {
  return {
    type: GET_ORDER_HISTORY,
    payload,
  };
};

export const actFetchOrderHistoryRequest = token => {
  return dispatch => {
    return getProfile(token).then(res => {
      const orderHistory = res.data.content.ordersHistory;
      dispatch(handlerGetOrderHistory(orderHistory));
    });
  };
};
