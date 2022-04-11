import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderHistoryComponent } from '../../components';
import { actFetchOrderHistoryRequest } from '../../redux/actions/orderAction';
import { getAccessTokenSelector } from '../../redux/selectors/authSelector';
import { getOrderHistorySelector } from '../../redux/selectors/orderSelector';
import { deleteOrderAPI } from '../../services/orderAPI';

const OrderHistoryScreen = () => {
  const ordersHistory = useSelector(getOrderHistorySelector);

  const token = useSelector(getAccessTokenSelector);

  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  const handlerRemoveOrderHistory = order => {
    let data = {};
    data.orderId = order.id;
    deleteOrderAPI(data, token)
      .then(res => {
        
        dispatch(actFetchOrderHistoryRequest(token));
      })
      .catch(err => console.log(err));
  };
  return (
    <OrderHistoryComponent 
      ordersHistory={ordersHistory}
      handlerRemoveOrderHistory={handlerRemoveOrderHistory}
      showAlert={showAlert}
      setShowAlert={setShowAlert}
    />
  );
};

export default OrderHistoryScreen;
