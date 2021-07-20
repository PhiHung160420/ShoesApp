import React from 'react';
import {View, StyleSheet} from 'react-native';
import HeaderBar from '../../components/HeaderBar';

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PaymentScreen;
