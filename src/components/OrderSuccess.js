import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessTokenSelector} from '../redux/selectors/authSelector';
import {getProfile} from '../services/profileAPI';
import {removeCartsInStorage} from '../utils/storage';
import {removeAllCarts} from '../redux/actions/cartAction';

const iconSuccess = require('../assets/images/payment-success.png');
const iconFailed = require('../assets/images/payment-fail.png');

const OrderSuccess = ({
  isModalVisible,
  toggleModal,
  modalContent,
  orderSuccess,
}) => {
  // use navigation
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handlerClickButton = async () => {
    if (orderSuccess) {
      toggleModal();
      navigation.push('HomeScreen');
      // remove all product in cart in redux and storage
      await removeCartsInStorage();
      dispatch(removeAllCarts([]));
    } else {
      toggleModal();
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={orderSuccess ? iconSuccess : iconFailed}
              style={styles.iconStyle}
            />
            <Text style={styles.titleStyle}>
              {modalContent && modalContent.title}
            </Text>
            <Text style={styles.msgModalStyle}>
              {modalContent && modalContent.message}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnContinue}
              onPress={handlerClickButton}>
              <Text style={styles.btnContinueText}>
                {orderSuccess ? 'CONTINUE SHOPPING' : 'TRY AGAIN'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: SIZES.height / 3 - 30,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  modalContent: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 25,
    color: COLORS.white,
    fontWeight: '500',
  },
  msgModalStyle: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.gainsboro,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  btnContinue: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
    height: '100%',
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  btnContinueText: {
    fontSize: 20,
    fontWeight: '500',
  },
  iconStyle: {
    width: 100,
    height: 100,
  },
});

export default OrderSuccess;
