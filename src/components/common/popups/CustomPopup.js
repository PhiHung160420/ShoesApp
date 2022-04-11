import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import Modal from 'react-native-modal';
import { COLORS, SIZES } from '../../../constants';

const CustomPopup = (props) => {
  const {
    isVisible,
    icon,
    title, 
    content, 
    leftButton, 
    rightButton,
    mainButton,
    onPressLeftButton,
    onPressRightButton,
    onPressMainButton,
    containerStyle,
    iconStyle
  } = props;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut">
      <View style={[styles.popupContainer, containerStyle]}>
        <View style={styles.popupContent}>
          {icon && <Image source={icon} style={[styles.iconStyle, iconStyle]} />}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>

        {leftButton && rightButton ?
          <View style={styles.twoButtonContainer}>
            <TouchableOpacity style={styles.leftButtonStyle} onPress={onPressLeftButton}>
              <Text style={styles.buttonTitle}>{leftButton}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rightButtonStyle} onPress={onPressRightButton}>
              <Text style={styles.buttonTitle}>{rightButton}</Text>
            </TouchableOpacity>
          </View> : 
          <TouchableWithoutFeedback onPress={onPressMainButton}>
            <View style={styles.mainButton}>
              <Text style={styles.buttonTitle}>{mainButton}</Text>
            </View>
          </TouchableWithoutFeedback>}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingTop: SIZES.size_20,
  },
  popupContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.size_10,
    marginBottom: SIZES.base
  },
  title: {
    fontSize: SIZES.size_25,
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  content: {
    fontSize: SIZES.size_19,
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Roboto Mono',
    marginBottom: SIZES.size_10,
  },
  twoButtonContainer: {
    height: SIZES.size_50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.gainsboro,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  leftButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  rightButtonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
    height: '100%',
    borderBottomRightRadius: SIZES.radius,
  },
  mainButton: {
    height: SIZES.size_60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gainsboro,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  buttonTitle: {
    fontSize: SIZES.size_20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  iconStyle: {
    width: SIZES.size_80,
    height: SIZES.size_80,
    marginBottom: SIZES.size_10,
  },
});

export default CustomPopup;
