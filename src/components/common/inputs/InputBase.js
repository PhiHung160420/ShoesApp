import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SIZES from '../../../constants/sizes/index';
import * as Animatable  from 'react-native-animatable';
import Feather  from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../../constants/colors/index';

const InputBase = (props) => {
  const {
    title,
    containerStyle,
    inputStyle,
    isValid,
    errorMessage,
    icon,
    inputName,
    keyboardType,
    value,
    onChangeText,
    secureTextEntry,
    setSecureTextEntry,
    isPasswordInput,
    placeholder
  }  = props;

  
  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{title}</Text>

      <View style={[styles.inputContainer, inputStyle, {borderBottomColor: isValid ? COLORS.lightGray2 : COLORS.red}]}>
        <FontAwesome name={icon} color={COLORS.primary} size={SIZES.size_25} />
        <TextInput
          name={inputName}
          style={styles.textInput}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
        />

        {isValid && value.length !== 0 && !isPasswordInput && 
        <Animatable.View animation="bounceIn">
          <Feather name="check-circle" color={COLORS.primary} size={20} />
        </Animatable.View>}
        
        {isPasswordInput && 
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          {secureTextEntry ? (
            <Feather name="eye" color={COLORS.black} size={20} />
          ) : (
            <Feather name="eye-off" color={COLORS.black} size={20} />
          )}
        </TouchableOpacity>} 
      </View>

      {!isValid && errorMessage.length !== 0 && <Text style={styles.textError}>{errorMessage}</Text>}
    </View>
  )
};

const styles = StyleSheet.create({
  title: {
    color: COLORS.primary,
    fontSize: 22,
    fontFamily: 'Roboto Mono',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.size_10,
    borderBottomWidth: 1,
    paddingBottom: SIZES.size_5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 20,
    color: COLORS.black,
  },
  textError: {
    color: COLORS.red,
    marginTop: 5,
  },
});

export default InputBase