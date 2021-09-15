import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../constants/colors.constants';
import {SIZES} from '../constants/sizes.constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getCartsSelector} from '../redux/selectors/cartSelector';
import {setCartsToStorage} from '../utils/storage';

const PopupAddToCart = ({handlerShowHidePopup, showHidePopup}) => {
  const navigation = useNavigation();

  const cartsInfo = useSelector(getCartsSelector);

  const handlerClickButton = () => {
    handlerShowHidePopup();
    navigation.navigate('CartScreen');
  };

  const handlerClickKeepShopping = () => {
    // save carts to storage
    const handlerSaveCartToStorage = async data => {
      return await setCartsToStorage(data);
    };

    handlerSaveCartToStorage(JSON.stringify(cartsInfo));

    handlerShowHidePopup();
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={showHidePopup}
        animationIn="zoomIn"
        animationOut="zoomOut">
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Image
              source={require('../assets/images/order-success.png')}
              style={styles.successIcon}
            />
            <Text style={styles.titleStyle}>Awesome!</Text>
            <Text style={styles.msgPopupContent}>
              You have added this item to your shopping cart
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnCancelStyle}
              onPress={handlerClickKeepShopping}>
              <Text style={styles.btnCancelText}>Keep Shopping</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOkStyle}
              onPress={handlerClickButton}>
              <Text style={styles.btnOkText}>Go To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    height: SIZES.height / 3,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  popupContent: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 25,
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  msgPopupContent: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Roboto Mono',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.gainsboro,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  btnCancelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  btnCancelText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  btnOkStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
    height: '100%',
    borderBottomRightRadius: SIZES.radius,
  },
  btnOkText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  successIcon: {
    width: 100,
    height: 100,
  },
});

export default PopupAddToCart;
