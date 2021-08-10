import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, SIZES} from '../../constants';
import {handlderSaveInfoPayment} from '../../redux/actions/paymentAction';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import {getProfileSelector} from '../../redux/selectors/profileSelector';
import {submitOrderAPI} from '../../services/orderAPI';
import {actFetchOrderHistoryRequest} from '../../redux/actions/orderAction';

const ButtonPayment = ({
  appTheme,
  address,
  cartInfo,
  setOrderSuccess,
  setModalVisible,
  isModalVisible,
}) => {
  // get profile from redux
  const profile = useSelector(getProfileSelector);

  const token = useSelector(getAccessTokenSelector);

  // use dispatch
  const dispatch = useDispatch();

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
    data.email = profile.email;

    // call api order
    if (data.length !== 0) {
      submitOrderAPI(data)
        .then(res => {
          dispatch(actFetchOrderHistoryRequest(token));
          setOrderSuccess(true);
          setModalVisible(!isModalVisible);
        })
        .catch(err => {
          setOrderSuccess(false);
          setModalVisible(!isModalVisible);
        });
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonPayment} onPress={handlerPayment}>
        <Text style={[styles.buttonText, {color: appTheme.textColor}]}>
          PAYMENT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPayment: {
    width: SIZES.width - 50,
    borderRadius: SIZES.radius * 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
});

export default ButtonPayment;
