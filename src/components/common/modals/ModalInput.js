import React from 'react';
import {
  StyleSheet, Text,
  TextInput,
  TouchableOpacity, View
} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, SIZES } from '../../../constants';

const ModalInput = ({
  isVisible,
  title,
  placeholder,
  onChangeText,
  leftButtonTitle,
  rightButtonTitle,
  onPressLeftButton,
  onPressRightButton,
  containerStyle,
  validTextField,
  isPasswordFiled = false,
  entryPassword,
  handleEntryPassword,
  messageError
}) => {

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onRequestClose={onPressLeftButton}
      >
      <View style={[styles.container, containerStyle]}>
        <Text style={styles.locationTitle}>{title}</Text>

        <View style={styles.textFieldContainer}>
          <TextInput
            style={[styles.inputStyle, {borderBottomColor: validTextField ? COLORS.black : COLORS.red}]}
            placeholder={placeholder}
            placeholderTextColor={COLORS.gray}
            secureTextEntry={entryPassword}
            onChangeText={onChangeText}
          />

          {isPasswordFiled && 
          <TouchableOpacity onPress={handleEntryPassword} style={styles.eyeButton}>
            {entryPassword ? 
            <Feather name="eye" color={COLORS.black} size={20} /> :
            <Feather name="eye-off" color={COLORS.black} size={20} />}
          </TouchableOpacity>}
        </View>
        
        {!validTextField && <Text style={styles.textError}>{messageError}</Text>}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onPressLeftButton}>
            <Text style={styles.buttonText}>{leftButtonTitle}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changeButton}
            onPress={onPressRightButton}>
            <Text style={styles.buttonText}>{rightButtonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SIZES.size_15,
    backgroundColor: COLORS.gainsboro,
    borderRadius: SIZES.radius * 2,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 5,
    fontFamily: 'Roboto Mono',
  },
  textFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: SIZES.size_15,
  },
  inputStyle: {
    borderBottomWidth: 1,
    width: '90%',
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Roboto Mono',
  },
  buttonContainer: {
    marginTop: SIZES.padding,
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
    fontFamily: 'Roboto Mono',
  },
  textError: {
    color: COLORS.red,
    marginTop: 5,
  },
});

export default ModalInput;
