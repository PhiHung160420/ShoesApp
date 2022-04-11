import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SIZES } from '../../../constants';

const IconButton = ({buttonContainerStyle, icon, iconStyle, onPress}) => {
  return (
    <TouchableOpacity style={[styles.container, buttonContainerStyle]} onPress={onPress}>
      <Image source={icon} style={[styles.icon, iconStyle]}/>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: SIZES.size_30,
    height: SIZES.size_30
  }
});

export default IconButton