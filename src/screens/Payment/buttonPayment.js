import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, SIZES} from '../../constants';
import {actFetchOrderHistoryRequest} from '../../redux/actions/orderAction';
import {getProfileSelector} from '../../redux/selectors/profileSelector';
import {submitOrder} from '../../services/orderAPI';

const ButtonPayment = ({
  appTheme,
  cartsInfo,
  setOrderSuccess,
  setModalVisible,
  isModalVisible,
}) => {
  // get profile from redux
  const profile = useSelector(getProfileSelector);

  // use dispatch
  const dispatch = useDispatch();

  const handlerPayment = async () => {
    let data = {};
    let orderDetail = [];

    cartsInfo.carts.forEach(item => {
      let order = {};
      order.productId = item.id;
      order.quantity = item.quantity;
      orderDetail.push(order);
    });

    data.orderDetail = orderDetail;
    data.email = profile.email;

    // call api order
    if (data.length !== 0) {
      submitOrder(data)
        .then(res => {
          if (res.data.statusCode === 200) {
            setOrderSuccess(true);
            setModalVisible(!isModalVisible);
          }
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
