import React from 'react';
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

const TotalBill = ({appTheme}) => {
  return (
    <View
      style={[
        styles.totalContainer,
        {backgroundColor: appTheme.viewBackground},
      ]}>
      {/* SUBTOTAL */}
      <View style={styles.subTotalContainer}>
        <Text style={styles.subText}>Subtotal</Text>
        <ProductPrice colorText={styles.colorText}>1000</ProductPrice>
      </View>
      {/* SUBTOTAL */}

      {/* DELIVERY COST */}
      <View style={styles.deliveryCostContainer}>
        <Text style={styles.costText}>Delivery Cost</Text>
        <ProductPrice colorText={styles.colorText}>100</ProductPrice>
      </View>
      {/* DELIVERY COST */}

      {/* SEPARATE */}
      <View style={styles.separateContainer}>
        <View style={styles.separate} />
      </View>
      {/* SEPARATE */}

      {/* TOTAL */}
      <View style={styles.TotalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <ProductPrice colorText={styles.colorText}>900</ProductPrice>
      </View>
      {/* TOTAL */}
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    flex: 1,
    borderRadius: SIZES.radius,
    width: SIZES.width - 50,
    marginHorizontal: 10,
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
    borderColor: COLORS.gray3,
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
