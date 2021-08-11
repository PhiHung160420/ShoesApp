import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import ProductPrice from '../../components/ProductPrice';

const TotalBill = ({appTheme, totalCart}) => {
  // delivery cost
  const [deliveryCost, setDeliveryCost] = useState(100);

  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    setTotalBill(totalCart - deliveryCost);
  }, [totalCart]);

  return (
    <View
      style={[
        styles.totalContainer,
        {backgroundColor: appTheme.viewBackground},
      ]}>
      {/* SUBTOTAL */}
      <View style={styles.subTotalContainer}>
        <Text style={[styles.subText, {color: appTheme.textColor}]}>
          Subtotal
        </Text>
        <ProductPrice colorText={styles.colorText}>{totalCart}</ProductPrice>
      </View>
      {/* SUBTOTAL */}

      {/* DELIVERY COST */}
      <View style={styles.deliveryCostContainer}>
        <Text style={[styles.costText, {color: appTheme.textColor}]}>
          Delivery Cost
        </Text>
        <ProductPrice colorText={styles.colorText}>{deliveryCost}</ProductPrice>
      </View>
      {/* DELIVERY COST */}

      {/* SEPARATE */}
      <View style={styles.separateContainer}>
        <View style={[styles.separate, {borderColor: appTheme.textColor}]} />
      </View>
      {/* SEPARATE */}

      {/* TOTAL */}
      <View style={styles.TotalContainer}>
        <Text style={[styles.totalText, {color: appTheme.textColor}]}>
          Total
        </Text>
        <ProductPrice colorText={styles.colorText}>{totalBill}</ProductPrice>
      </View>
      {/* TOTAL */}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  costText: {
    fontSize: 20,
    fontWeight: '500',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  colorText: {
    color: COLORS.black,
  },
});

export default TotalBill;
