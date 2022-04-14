import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES, CONSTANST} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { appThemeSelector } from '../../redux/selectors/themeSelector';

const payments = CONSTANST?.payments;

const Method = ({item, methodSelected, handerSelectedMethod, appTheme}) => {
  return (
    <TouchableOpacity
      style={[
        styles.methodContainer,
        {
          backgroundColor: appTheme.viewBackground,
          borderWidth: methodSelected == item.id ? 2 : 0,
          borderColor: methodSelected == item.id && COLORS.primary,
        }
      ]}
      onPress={() => handerSelectedMethod(item.id)}>
      <View style={styles.methodInfo}>
        <Image style={styles.methodImage} source={item.image} />

        <Text style={[styles.methodName, {color: appTheme.textColor}]}>
          {item.name}
        </Text>
      </View>

      {methodSelected == item.id && (
        <View style={styles.checkedContainer}>
          <Feather name="check-circle" size={20} color={COLORS.white} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const PaymentMethod = ({methodSelected, handerSelectedMethod}) => {
  const appTheme = useSelector(appThemeSelector);

  return (
    <View style={styles.paymentMethodContainer}>
      <View style={styles.paymentMethodBar}>
        <Text style={[styles.paymentMethodTitle, {color: appTheme.textColor}]}>PAYMENT METHOD</Text>
        
        <TouchableOpacity style={styles.addBtnContainer}>
          <Text style={styles.addBtnContent}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal={false} showsVerticalScrollIndicator={false} scrollEnabled={false}>
        {payments.map((item, index) => (
          <Method
            item={item}
            key={index}
            appTheme={appTheme}
            methodSelected={methodSelected}
            handerSelectedMethod={handerSelectedMethod}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentMethodContainer: {
    marginTop: SIZES.padding,
  },
  paymentMethodBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  addBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  addBtnContent: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
    color: COLORS.white,
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    height: 45,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Roboto Mono',
  },
  methodImage: {
    width: 40,
    height: 40,
  },
  cardNumber: {
    marginLeft: 10,
  },
  checkedContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
});

export default PaymentMethod;
