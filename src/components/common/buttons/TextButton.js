import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { getAppThemeSelector } from '../../../redux/selectors/themeSelector';

const TextButton = (props) => {
  const {
    title,
    buttonContainerStyle,
    titleStyle,
    onPress
  } = props;

  const appTheme = useSelector(getAppThemeSelector);

  return (
    <TouchableOpacity style={[styles(appTheme).container, buttonContainerStyle]} onPress={onPress}>
      <Text style={[styles(appTheme).title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
};

const styles = appTheme => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appTheme?.buttonBackgroundColor,
  },
  title: {
    color: appTheme?.textColor,
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Roboto Mono',
  }
});

export default TextButton;