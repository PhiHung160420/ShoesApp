import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import DeliveryAddress from './address';
import PaymentMethod from './paymentMethod';
import TotalBill from './totalBill';
import ButtonPayment from './buttonPayment';

const nameIcon = 'arrow-back-outline';

const PaymentScreen = () => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

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

      {/* PAYMENT CONTAINER */}
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.paymentContainer,
            {backgroundColor: appTheme.flatlistbackgroundItem},
          ]}>
          {/* DELIVERY ADDRESS */}
          <DeliveryAddress appTheme={appTheme} />
          {/* DELIVERY ADDRESS */}

          {/* PAYMENT METHOD */}
          <PaymentMethod appTheme={appTheme} />
          {/* PAYMENT METHOD */}

          {/* TOTAL BILL */}
          <TotalBill appTheme={appTheme} />
          {/* TOTAL BILL */}

          {/* BUTTON PAYMENT */}
          <ButtonPayment appTheme={appTheme} />
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
    height: SIZES.height - 200,
    borderRadius: SIZES.radius * 2,
    marginTop: -100,
  },
});

export default PaymentScreen;
