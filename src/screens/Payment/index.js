import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import DeliveryAddress from './address';
import PaymentMethod from './paymentMethod';
import TotalBill from './totalBill';
import ButtonPayment from './buttonPayment';
import Promotion from './promotion';
import {getCartsSelector} from '../../redux/selectors/cartSelector';
import OrderSuccess from '../../components/OrderSuccess';

const nameIcon = 'arrow-back-outline';

const PaymentScreen = ({route}) => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state show modal
  const [isModalVisible, setModalVisible] = useState(false);

  // state message show modal
  const [modalContent, setModalContent] = useState({});

  // state order success
  const [isOrderSuccess, setOrderSuccess] = useState(false);

  // state address
  const [address, setAddress] = useState('112 Ly Chinh Thang, Quan 1, TP.HCM');

  // handler show hide modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // get total cart from params
  const {totalCart} = route.params;

  // get carts from redux
  const cartsInfo = useSelector(getCartsSelector);

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

      {/* PAYMENT CONTAINER */}
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.paymentContainer,
            {backgroundColor: appTheme.flatlistbackgroundItem},
          ]}>
          {/* DELIVERY ADDRESS */}
          <DeliveryAddress appTheme={appTheme} address={address} />
          {/* DELIVERY ADDRESS */}

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
            cartsInfo={cartsInfo}
            setOrderSuccess={setOrderSuccess}
            isOrderSuccess={isOrderSuccess}
            setModalVisible={setModalVisible}
            isModalVisible={isModalVisible}
          />
          {/* BUTTON PAYMENT */}
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
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentContainer: {
    width: SIZES.width - 30,
    height: SIZES.height - 170,
    borderRadius: SIZES.radius * 2,
    marginTop: -80,
  },
});

export default PaymentScreen;
