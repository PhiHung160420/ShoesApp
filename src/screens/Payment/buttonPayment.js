import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const ButtonPayment = ({appTheme}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonPayment}>
        <Text style={[styles.buttonText, {color: appTheme.textColor}]}>
          PAYMENT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPayment: {
    width: SIZES.width - 50,
    borderRadius: SIZES.radius * 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
});

export default ButtonPayment;
