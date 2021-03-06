import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {PaymentComponent} from '../../components';
import { cartSelector } from '../../redux/selectors/cartSelector';
import { profileSelector } from '../../redux/selectors/profileSelector';
import { accessTokenSelector } from '../../redux/selectors/authSelector';
import { CONSTANST } from '../../constants';
import { submitOrderAPI } from '../../services/orderAPI';
import {fetchOrderHistoryAction} from '../../redux/actions/orderAction';
import {removeAllCartsAction} from '../../redux/actions/cartAction';

const PaymentScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const cartInfo = useSelector(cartSelector);

  const profile = useSelector(profileSelector);

  const token = useSelector(accessTokenSelector);

  const [isModalVisible, setModalVisible] = useState(false);

  const [modalContent, setModalContent] = useState({});

  const [totalCart, setTotalCart] = useState(0);

  const [isOrderSuccess, setOrderSuccess] = useState(false);

  const [address, setAddress] = useState(null);

  const [methodSelected, setMethodSelected] = useState(CONSTANST?.payments[0]?.id);

  const [deliveryCost, setDeliveryCost] = useState(100);

  const [totalBill, setTotalBill] = useState(0);

  const handlerPayment = async () => {
    // object to save order to server
    let data = {};
    let orderDetail = [];
    cartInfo.carts.forEach(item => {
      let order = {};
      order.productId = item.id;
      order.quantity = item.quantity;
      orderDetail.push(order);
    });
    data.orderDetail = orderDetail;
    data.email = profile?.email;

    // call api order
    if (data.length !== 0) {
      submitOrderAPI(data)
        .then(res => {
          dispatch(fetchOrderHistoryAction(token));
          setOrderSuccess(true);
          setModalVisible(!isModalVisible);
        })
        .catch(err => {
          setOrderSuccess(false);
          setModalVisible(!isModalVisible);
        });
    }
  };

  useEffect(() => {
    setTotalBill(totalCart + deliveryCost);
  }, [totalCart]);

  const handerSelectedMethod = methodId => {
    setMethodSelected(methodId);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlerClickContinueShopping = async () => {
    navigation.navigate('HomeScreen');
    toggleModal();
    if (isOrderSuccess) {
      dispatch(removeAllCartsAction([]));
    }
  };

  useEffect(() => {
    let totalPrice = 0;
    cartInfo.carts.forEach(item => {
      totalPrice += item.quantity * item.price;
    });
    setTotalCart(totalPrice);
  }, [cartInfo]);

  useEffect(() => {
    if (isOrderSuccess) {
      setModalContent({
        title: 'Success',
        message: 'Congratulation! Your payment was complete.',
      });
    } else {
      setModalContent({
        title: 'Failed',
        message: 'Your order fail! Please check your order again.',
      });
    }
  }, [isOrderSuccess]);

  return (
    <PaymentComponent 
      cartInfo={cartInfo}
      isModalVisible={isModalVisible}
      modalContent={modalContent}
      totalCart={totalCart}
      isOrderSuccess={isOrderSuccess}
      address={address}
      methodSelected={methodSelected}
      deliveryCost={deliveryCost}
      totalBill={totalBill}
      handerSelectedMethod={handerSelectedMethod}
      handlerPayment={handlerPayment}
      toggleModal={toggleModal}
      setAddress={setAddress}
      handlerClickContinueShopping={handlerClickContinueShopping}
    />
  );
};

export default PaymentScreen;
