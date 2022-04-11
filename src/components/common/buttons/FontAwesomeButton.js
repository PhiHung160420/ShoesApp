import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SIZES } from '../../../constants';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';

const FontAwesomeButton = ({icon, iconColor, iconSize, buttonContainerStyle, onPress}) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, buttonContainerStyle]} onPress={onPress}>
      <FontAwesome name={icon} color={iconColor} size={iconSize} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: SIZES.size_40,
    height: SIZES.size_40,
    borderRadius: SIZES.size_20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FontAwesomeButton