import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text, TextInput, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { CustomPopup, HeaderBar, ModalInput, TextButton } from '../../components/common';
import { COLORS, ICONS, SIZES } from '../../constants';
import { getAppThemeSelector } from '../../redux/selectors/themeSelector';
import PaymentItems from './PaymentItems';
import PaymentMethod from './PaymentMethod';

const PaymentComponent = (props) => {
  const {
    cartInfo,
    isModalVisible,
    modalContent,
    totalCart,
    isOrderSuccess,
    address,
    methodSelected,
    deliveryCost,
    totalBill,
    handerSelectedMethod,
    handlerPayment,
    setAddress,
    handlerClickContinueShopping,
  } = props;

  const appTheme = useSelector(getAppThemeSelector);
  const [isChangeAddress, setIsChangeAddress] = useState(false);
  
  return (
    <View style={styles.container}>
      <HeaderBar nameIcon={ICONS.arrow_back}>
        <View style={styles.titlePayment}>
          <Text style={styles.titleText}>PAYMENT</Text>
        </View>
      </HeaderBar>

      <CustomPopup 
        isVisible={isModalVisible}
        icon={isOrderSuccess ? ICONS.order_success : ICONS.order_failed}
        title={modalContent?.title || ''}
        content={modalContent?.message || ''}
        onPressMainButton={handlerClickContinueShopping}
        mainButton={isOrderSuccess ? 'CONTINUE SHOPPING' : 'TRY AGAIN'}
      />

      <ModalInput
        isVisible={isChangeAddress}
        address={address}
        title="Your Location"
        placeholder="Nhập vào địa chỉ của bạn"
        setIsChangeAddress={setIsChangeAddress}
        onChangeText={val => setAddress(val)}
        leftButtonTitle="Cancel"
        onPressLeftButton={() => setIsChangeAddress(false)}
        rightButtonTitle={address ? 'Update' : 'Add'}
        onpressRightButton={() => setIsChangeAddress(false)}
      />

      <View style={[styles.paymentContainer, {backgroundColor: appTheme.flatlistbackgroundItem}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View style={styles.addressContainer}>
            <Text style={[styles.titleStyle, {color: appTheme.textColor}]}>DELIVERY ADDRESS</Text>
            <View style={[styles.addressStyle,{backgroundColor: appTheme.viewBackground},]}>
              <View style={styles.addressContent}>
                <Text style={styles.titleHomeAddress}>HOME ADDRESS</Text>

                <TextButton 
                  title={address ? 'Change' : 'Add'}
                  buttonContainerStyle={styles.btnChangeAddress}
                  titleStyle={styles.textButton}
                  onPress={() => setIsChangeAddress(true)}
                />
              </View>

              <View style={styles.addressTextContainer}>
                <Text style={styles.addressText}>{address !== null ? address : 'Please type your home address'}</Text>
              </View>
            </View>
          </View>

          <PaymentItems items={cartInfo}/>

          <PaymentMethod methodSelected={methodSelected} handerSelectedMethod={handerSelectedMethod}/>

          <View style={styles.promoContainer}>
            <Text style={[styles.titleStyle, {color: appTheme.textColor, textTransform: 'uppercase'}]}>Promotion</Text>
            <View style={[styles.promoStyle, {backgroundColor: appTheme.viewBackground}]}>
              <TextInput
                style={styles.promoInput}
                placeholder="Promo Code"
                placeholderTextColor={appTheme.textColor}
              />
              <TextButton title="Apply" buttonContainerStyle={styles.applyButton} titleStyle={styles.textButton}/>
            </View>
          </View>

          <View style={[styles.totalContainer, {backgroundColor: appTheme.viewBackground}]}>
            <View style={styles.subTotalContainer}>
              <Text style={[styles.subText, {color: appTheme.textColor}]}>Subtotal</Text>
              <Text style={[styles.titleStyle, {color: appTheme.textColor}]}>${totalCart}</Text>
            </View>

            <View style={styles.deliveryCostContainer}>
              <Text style={[styles.costText, {color: appTheme.textColor}]}>Delivery Cost</Text>
              <Text style={[styles.titleStyle, {color: appTheme.textColor}]}>${deliveryCost}</Text>
            </View>

            <View style={styles.separateContainer}>
              <View style={[styles.separate, {borderColor: appTheme.textColor}]} />
            </View>

            <View style={styles.TotalContainer}>
              <Text style={[styles.totalText, {color: appTheme.textColor}]}>Total</Text>
              <Text style={[styles.titleStyle, {color: appTheme.textColor}]}>${totalBill}</Text>
            </View>
          </View>

          <TextButton 
            title="PAYMENT"
            buttonContainerStyle={styles.buttonPayment}
            titleStyle={styles.buttonPaymentText}
            onPress={handlerPayment}
          />
        </ScrollView>
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
    color: COLORS.white
  },
  paymentContainer: {
    width: SIZES.deviceWidth - SIZES.radius * 2,
    height: SIZES.deviceHeight - 120,
    borderRadius: SIZES.radius * 2,
    marginTop: -SIZES.size_50,
    alignItems: 'center',
    marginHorizontal: SIZES.radius
  },
  contentContainerStyle: {
    paddingBottom: SIZES.size_50,
    paddingTop: SIZES.padding,
  },
  addressContainer: { 
    marginBottom: SIZES.padding,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  textButton: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
    color: COLORS.white,
  },
  addressStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  addressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnChangeAddress: {
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
  },
  titleHomeAddress: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  addressTextContainer: {
    marginVertical: 10,
  },
  addressText: {
    fontSize: 17,
    fontFamily: 'Roboto Mono',
  },
  btnChangeContent: {
    fontSize: 15,
    fontFamily: 'Roboto Mono',
  },
  promoContainer: {
    height: SIZES.size_70,
    marginTop: SIZES.padding,
    marginBottom: SIZES.size_20,
  },
  promoStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    height: 50,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  promoInput: {
    height: 30,
    fontSize: 15,
    width: '40%',
    color: COLORS.black,
  },
  applyButton: {
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
  },
  buttonPayment: {
    marginTop: SIZES.padding,
    borderRadius: SIZES.radius * 2,
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
  },
  totalContainer: {
    flex: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  subTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separateContainer: {
    height: 20,
  },
  separate: {
    borderWidth: 0.3,
    marginVertical: 10,
  },
  TotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  costText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  colorText: {
    color: COLORS.black,
  },
  buttonPaymentText: {
    fontSize: SIZES.size_20,
    color: COLORS.white
  }
});

export default PaymentComponent;
