import React from 'react';
import { StyleSheet, View, Text, TextInput, Platform, TouchableOpacity  } from 'react-native';
import  FontAwesome  from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import  Feather  from 'react-native-vector-icons/Feather';
import COLORS from '../../../constants/colors/index';

const InputFormik = (props) => {
  const {
    title,
    containerStyle,
    icon,
    isPassword = false,
    placeholder,
    keyboardType,
    onChangeText,
    onBlur,
    value,
    inputStyle,
    error,
    touched,
    inputName,
    isEntryPassword,
    handlerEntryPassword
  } = props;

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.inputContainer, error && touched && styles.error]}>
        <FontAwesome name={icon} color={COLORS.primary} size={20} />
        <TextInput
          name={inputName}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          style={[styles.textInput, inputStyle]}
          autoCapitalize="none"
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={isEntryPassword}
          onBlur={onBlur}
          value={value}
        />

        {!error && value.length !== 0 && !isPassword && (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color={COLORS.primary} size={20} />
          </Animatable.View>
        )}

       {isPassword &&  
        <TouchableOpacity onPress={handlerEntryPassword}>
          {isEntryPassword ? <Feather name="eye" color="grey" size={20} /> : <Feather name="eye-off" color="grey" size={20} />}
        </TouchableOpacity>}
      </View>

      {error && touched && <Text style={styles.textError}>{error}</Text>}
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
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 20,
    fontFamily: 'Roboto Mono',
  },
  error: {
    borderBottomColor: 'red',
  },
  textError: {
    color: 'red',
    marginTop: 5,
  },
});

export default InputFormik