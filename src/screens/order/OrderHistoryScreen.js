import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrderHistoryComponent } from '../../components';
import { fetchOrderHistoryAction } from '../../redux/actions/orderAction';
import { accessTokenSelector } from '../../redux/selectors/authSelector';
import { orderHistorySelector } from '../../redux/selectors/orderSelector';
import { deleteOrderAPI } from '../../services/orderAPI';

const OrderHistoryScreen = () => {
  const ordersHistory = useSelector(orderHistorySelector);

  const token = useSelector(accessTokenSelector);

  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  const handlerRemoveOrderHistory = order => {
    let data = {};
    data.orderId = order.id;
    deleteOrderAPI(data, token)
      .then(res => {
        
        dispatch(fetchOrderHistoryAction(token));
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
