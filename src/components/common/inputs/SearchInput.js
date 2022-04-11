import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { getAppThemeSelector } from '../../../redux/selectors/themeSelector';
import {SIZES, COLORS} from '../../../constants';

const SearchInput = ({containerStyle, inputStyle, placeholder, buttonStyle}) => {
  const appTheme = useSelector(getAppThemeSelector);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.content, {
        borderColor: appTheme.searchBackgroundColor,
        backgroundColor: appTheme.searchBackgroundColor,
      }]}>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
        />
        <TouchableOpacity style={[styles.button, buttonStyle]}>
          <Feather name="search" size={SIZES.size_20} color={appTheme.iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: SIZES.deviceWidth - SIZES.padding,
    borderRadius: SIZES.size_20,
    height: SIZES.size_40,
    borderWidth: 1,
  },
  input: {
    fontSize: SIZES.size_17,
    height: SIZES.size_40,
    margin: SIZES.padding,
    color: COLORS.black,
  },
  button: {
    width: SIZES.size_35,
    height: SIZES.size_35,
    borderRadius: SIZES.size_20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.size_5,
    position: 'absolute',
    right: 0
  },
});

export default SearchInput