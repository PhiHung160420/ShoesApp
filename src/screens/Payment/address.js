import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const DeliveryAddress = ({appTheme}) => {
  return (
    <View style={styles.addressContainer}>
      <Text style={[styles.addressTitle, {color: appTheme.textColor}]}>
        DELIVERY ADDRESS
      </Text>
      {/* ADDRESS FIELD */}
      <View
        style={[
          styles.addressStyle,
          {backgroundColor: appTheme.viewBackground},
        ]}>
        {/* ADDRESS CONTENT */}
        <View style={styles.addressContent}>
          <Text style={styles.titleHomeAddress}>HOME ADDRESS</Text>
          <Text style={styles.address}>12 district, HCM city</Text>
        </View>
        {/* ADDRESS CONTENT */}

        {/* CHANGE ADDRESS BUTTON */}
        <TouchableOpacity style={styles.btnChangeAddress}>
          <Text style={styles.btnChangeContent}>CHANGE</Text>
        </TouchableOpacity>
        {/* CHANGE ADDRESS BUTTON */}
      </View>
      {/* ADDRESS FIELD */}
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flex: 1,
    marginTop: 10,
  },
  addressTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  addressStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    width: SIZES.width - 50,
    height: 80,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  addressContent: {
    flexDirection: 'column',
  },
  btnChangeAddress: {
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.green,
  },
  titleHomeAddress: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 12,
  },
  btnChangeContent: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default DeliveryAddress;
