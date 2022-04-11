import React from 'react'
import { useSelector } from 'react-redux';
import { getAppThemeSelector } from '../../../redux/selectors/themeSelector';
import {SIZES} from '../../../constants';
import { StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const IconLabel = ({icon, label, conatainerStyle, iconSize, labelStyle}) => {
  const appTheme = useSelector(getAppThemeSelector);

  return (
    <View style={[styles.container, conatainerStyle]}>
      <Feather name={icon} size={iconSize || 25} color={appTheme.textColor} />
      <Text style={[styles.label, labelStyle, {color: appTheme.textColor}]}>{label}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: SIZES.size_18,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
});

export default IconLabel