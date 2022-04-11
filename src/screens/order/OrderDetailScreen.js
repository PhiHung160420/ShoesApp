import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { OrderDetailComponent } from '../../components';
import { getOrderHistorySelector } from '../../redux/selectors/orderSelector';
import { getProfileSelector } from '../../redux/selectors/profileSelector';


const OrderDetailScreen = ({route}) => {
  const {orderId} = route.params;

  const profile = useSelector(getProfileSelector);

  const ordersHistory = useSelector(getOrderHistorySelector);

  let result = ordersHistory.find(element => element.id == orderId);

  const [order, setOrder] = useState(result);

  const [productsOrdered, setProductsOrdered] = useState(order.orderDetail);

  return (
    <OrderDetailComponent 
      profile={profile}
      order={order}
      productsOrdered={productsOrdered}
    />
  );
};

export default OrderDetailScreen;
