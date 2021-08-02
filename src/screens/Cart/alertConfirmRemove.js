import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';

const AlertConfirmRemove = ({
  item,
  showAlert,
  handlerHideAlert,
  handlerRemoveProductFromCart,
}) => {
  return (
    <AwesomeAlert
      show={showAlert}
      title="Confirm"
      message="Are you sure want to delete this shoes ?"
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="No"
      confirmText="Yes"
      onCancelPressed={handlerHideAlert}
      onConfirmPressed={() => handlerRemoveProductFromCart(item)}
      contentContainerStyle={styles.alertContainerStyle}
      titleStyle={styles.titleAlertStyle}
      messageStyle={styles.messageAlertStyle}
      cancelButtonStyle={styles.cancelButtonStyle}
      confirmButtonStyle={styles.confirmButtonStyle}
      cancelButtonTextStyle={styles.cancelBtnTextStyle}
      confirmButtonTextStyle={styles.confirmBtnTextStyle}
    />
  );
};

const styles = StyleSheet.create({
  alertContainerStyle: {
    borderRadius: SIZES.radius * 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleAlertStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageAlertStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  cancelButtonStyle: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  confirmButtonStyle: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: COLORS.green,
  },
  cancelBtnTextStyle: {
    fontSize: 20,
    color: COLORS.black,
  },
  confirmBtnTextStyle: {
    fontSize: 20,
    color: COLORS.black,
  },
});

export default AlertConfirmRemove;
