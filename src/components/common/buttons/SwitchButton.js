import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SIZES from '../../../constants/sizes/index';
import COLORS from '../../../constants/colors/index';

const SwitchButton = (props) => {
  const {
    title,
    containerStyle,
    value,
    onChangeValue,
    label_1,
    label_2
  } = props;

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <TouchableOpacity style={value ? styles.buttonSelected : styles.buttonNoneSelected} onPress={() => onChangeValue(true)}>
          <Text style={value ? styles.textSelected : styles.textNoneSelected}>{label_1}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={!value ? styles.buttonSelected : styles.buttonNoneSelected} onPress={() => onChangeValue(false)}>
          <Text style={!value ? styles.textSelected : styles.textNoneSelected}>{label_2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.primary,
    fontSize: 22,
    fontFamily: 'Roboto Mono',
  },
  container: {
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonNoneSelected: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray3,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c1c1c1',
    paddingHorizontal: SIZES.size_15,
    paddingVertical: SIZES.size_8,
  },
  buttonSelected: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.size_15,
    paddingVertical: SIZES.size_8,
  },
  textSelected: {
    fontSize: SIZES.size_15,
    color: COLORS.white,
    fontFamily: 'Roboto Mono',
  },
  textNoneSelected: {
    fontSize: SIZES.size_15,
    color: COLORS.primary,
    fontFamily: 'Roboto Mono',
  },
});

export default SwitchButton