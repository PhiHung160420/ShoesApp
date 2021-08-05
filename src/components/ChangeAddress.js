import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, SIZES} from '../constants';

const ChangeAddress = ({
  isChangeAddress,
  setIsChangeAddress,
  setAddress,
  address,
}) => {
  const [value, setValue] = useState(null);

  const handlerChangeText = val => {
    if (val.length !== 0) {
      setValue(val);
    }
  };

  const handlerChangeAddress = () => {
    if (value) {
      setAddress(value);
      setIsChangeAddress(false);
    }
  };

  return (
    <Modal
      isVisible={isChangeAddress}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <View style={styles.container}>
        <Text style={styles.locationTitle}>Your Location</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Nhập vào địa chỉ của bạn"
          placeholderTextColor={COLORS.gray}
          onChangeText={val => handlerChangeText(val)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsChangeAddress(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={handlerChangeAddress}>
            <Text style={styles.buttonText}>{address ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 150,
    backgroundColor: COLORS.gainsboro,
    borderRadius: SIZES.radius * 2,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
  },
  inputStyle: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    width: '90%',
    marginTop: 20,
    fontSize: 18,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
  },
  cancelButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
  },
  changeButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    marginLeft: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.white,
  },
});

export default ChangeAddress;
