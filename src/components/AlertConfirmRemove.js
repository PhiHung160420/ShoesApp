import React, {useEffect} from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors.constants';
import {SIZES} from '../constants/sizes.constants';

const AlertConfirmRemove = ({
  item,
  showAlert,
  handlerHideAlert,
  handlerRemoveItem,
  message,
}) => {
  return (
    <AwesomeAlert
      show={showAlert}
      title="Confirm"
      message={message}
      closeOnTouchOutside={true}
      showCancelButton={true}
      showConfirmButton={true}
      cancelText="No"
      confirmText="Yes"
      onCancelPressed={handlerHideAlert}
      onConfirmPressed={() => handlerRemoveItem(item)}
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
