import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const DeliveryAddress = ({appTheme, address, setIsChangeAddress}) => {
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
        <View style={styles.addressContent}>
          {/* ADDRESS TITLE */}
          <Text style={styles.titleHomeAddress}>HOME ADDRESS</Text>
          {/* ADDRESS TITLE */}

          {/* CHANGE ADDRESS BUTTON */}
          <TouchableOpacity
            style={styles.btnChangeAddress}
            onPress={() => setIsChangeAddress(true)}>
            <Text style={styles.btnChangeContent}>
              {address ? 'Change' : 'Add'}
            </Text>
          </TouchableOpacity>
          {/* CHANGE ADDRESS BUTTON */}
        </View>

        <View style={styles.addressTextContainer}>
          <Text style={styles.addressText}>
            {address !== null ? address : 'Hãy thêm địa chỉ nhận hàng'}
          </Text>
        </View>
      </View>
      {/* ADDRESS FIELD */}
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  addressTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
  },
  addressStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderRadius: SIZES.radius,
    width: SIZES.width - 50,
    marginHorizontal: 10,
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
    backgroundColor: COLORS.green,
  },
  titleHomeAddress: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  addressTextContainer: {
    marginVertical: 10,
  },
  addressText: {
    fontSize: 16,
  },
  btnChangeContent: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default DeliveryAddress;
