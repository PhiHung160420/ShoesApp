import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS} from '../../constants/colors.constants';
import {SIZES} from '../../constants/sizes.constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import DeliveryAddress from './Address';
import PaymentMethod from './PaymentMethod';
import TotalBill from './TotalBill';
import ButtonPayment from './ButtonPayment';
import Promotion from './Promotion';
import {getCartsSelector} from '../../redux/selectors/cartSelector';
import OrderSuccess from '../../components/OrderSuccess';
import ModalChangeAddress from '../../components/ModalChangeAddress';
import ProductList from './ProductList';

const nameIcon = 'arrow-back-outline';

const PaymentScreen = () => {
  // use dispatch
  const dispatch = useDispatch();

  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // get cart from redux
  const cartInfo = useSelector(getCartsSelector);

  // state show modal
  const [isModalVisible, setModalVisible] = useState(false);

  // state message show modal
  const [modalContent, setModalContent] = useState({});

  // state total cart
  const [totalCart, setTotalCart] = useState(0);

  // state order success
  const [isOrderSuccess, setOrderSuccess] = useState(false);

  // state address
  const [address, setAddress] = useState(null);

  // state change password
  const [isChangeAddress, setIsChangeAddress] = useState(false);

  // handler show hide modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
        title: 'Oh Snap...',
        message: 'Your order fail! Please check your order again.',
      });
    }
  }, [isOrderSuccess]);

  return (
    <View style={styles.container}>
      {/* HEADER BAR */}
      <HeaderBar nameIcon={nameIcon}>
        <View style={styles.titlePayment}>
          <Text style={[styles.titleText, {color: appTheme.textColor}]}>
            PAYMENT
          </Text>
        </View>
      </HeaderBar>
      {/* HEADER BAR */}

      {/* MODAL */}
      {isModalVisible && (
        <OrderSuccess
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          modalContent={modalContent}
          orderSuccess={isOrderSuccess}
        />
      )}
      {/* MODAL */}
      {isChangeAddress && (
        <ModalChangeAddress
          isChangeAddress={isChangeAddress}
          setIsChangeAddress={setIsChangeAddress}
          address={address}
          setAddress={setAddress}
        />
      )}

      {/* PAYMENT CONTAINER */}
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.paymentContainer,
            {backgroundColor: appTheme.flatlistbackgroundItem},
          ]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            {/* DELIVERY ADDRESS */}
            <DeliveryAddress
              appTheme={appTheme}
              address={address}
              setIsChangeAddress={setIsChangeAddress}
            />
            {/* DELIVERY ADDRESS */}

            {/* PRODUCT LIST */}
            <ProductList items={cartInfo} />
            {/* PRODUCT LIST */}

            {/* PAYMENT METHOD */}
            <PaymentMethod appTheme={appTheme} />
            {/* PAYMENT METHOD */}

            {/* PROMOTION */}
            <Promotion />
            {/* PROMOTION */}

            {/* TOTAL BILL */}
            <TotalBill appTheme={appTheme} totalCart={totalCart} />
            {/* TOTAL BILL */}

            {/* BUTTON PAYMENT */}
            <ButtonPayment
              appTheme={appTheme}
              cartInfo={cartInfo}
              address={address}
              setOrderSuccess={setOrderSuccess}
              isOrderSuccess={isOrderSuccess}
              setModalVisible={setModalVisible}
              isModalVisible={isModalVisible}
            />
            {/* BUTTON PAYMENT */}
          </ScrollView>
        </View>
        {/* PAYMENT CONTAINER */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titlePayment: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentContainer: {
    width: SIZES.width - 20,
    height: SIZES.height - 120,
    borderRadius: SIZES.radius * 2,
    marginTop: -50,
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 40,
  },
});

export default PaymentScreen;
