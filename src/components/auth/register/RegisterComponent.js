import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal, Platform, ScrollView,
  StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { CONSTANST } from '../../../constants';
import COLORS from '../../../constants/colors/index';
import SIZES from '../../../constants/sizes/index';
import { InputFormik, SwitchButton, TextButton } from '../../common';

const RegisterComponent = (props) => {
  const {
    registerSchema,
    isRegisterSuccess,
    gender,
    isModalVisible,
    messageRegister,
    setGender,
    onPressRegister,
    handlerClickModal,
  } = props;

  const navigation = useNavigation();

  const [isEntryPassword, setEntryPassword] = useState(true);

  return (
    <KeyboardAvoidingView 
      style={{flex: 1}} 
      behavior={CONSTANST.isIOS ?'padding': null}
      keyboardVerticalOffset={CONSTANST.isIOS ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Register Now!</Text>
          </View>

          <Modal animationType="slide" transparent={true} visible={isModalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {isRegisterSuccess && messageRegister !== ''
                    ? `${messageRegister} Hãy nhấn tiếp tục để đăng nhập.`
                    : `${messageRegister} Hãy tiến hành đăng kí lại`}
                </Text>
                <TouchableOpacity style={styles.buttonModal} onPress={handlerClickModal}>
                  <Text style={styles.textStyle}>{isRegisterSuccess ? 'Tiếp tục' : 'Ok'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Formik
            validationSchema={registerSchema}
            initialValues={{
              name: '',
              email: '',
              phone: '',
              password: '',
            }}
            onSubmit={onPressRegister}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Animatable.View animation="fadeInUpBig" delay={500} style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: SIZES.size_120}}>
                  <InputFormik 
                    title="Username"
                    icon="user-o"
                    placeholder="Username"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                    inputName="name"
                  />

                  <InputFormik 
                    title="Email"
                    icon="envelope-open"
                    placeholder="Email Address"
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    inputName="email"
                    containerStyle={styles.marginTop}
                  />

                  <InputFormik 
                    title="Phone Number"
                    icon="phone"
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    error={errors.phone}
                    touched={touched.phone}
                    inputName="phone"
                    containerStyle={styles.marginTop}
                  />

                  <SwitchButton 
                    title="Gender"
                    value={gender}
                    onChangeValue={setGender}
                    containerStyle={styles.marginTop}
                    label_1="Male"
                    label_2="Female"
                  />

                  <InputFormik 
                    title="Password"
                    icon="lock"
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    error={errors.password}
                    touched={touched.password}
                    inputName="password"
                    containerStyle={styles.marginTop}
                    isPassword
                    isEntryPassword={isEntryPassword}
                    handlerEntryPassword={() => setEntryPassword(!isEntryPassword)}
                  />

                  <TextButton 
                    title="Register"
                    buttonContainerStyle={styles.registerButton}
                    titleStyle={{color: COLORS.white}}
                    onPress={handleSubmit}
                  />

                  <TextButton 
                    title="Login"
                    buttonContainerStyle={styles.loginButton}
                    titleStyle={{color: COLORS.primary}}
                    onPress={() => navigation.push('LoginScreen')}
                  />
                </ScrollView>
              </Animatable.View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  header: {
    height: SIZES.size_150,
    justifyContent: 'flex-end',
    paddingLeft: SIZES.size_20,
    paddingBottom: SIZES.size_20,
  },
  content: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.size_30,
    borderTopRightRadius: SIZES.size_30,
    padding: SIZES.padding,
  },
  headerTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: SIZES.size_30,
    fontFamily: 'Roboto Mono',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 22,
    fontFamily: 'Roboto Mono',
  },
  marginTop: {
    marginTop: SIZES.padding,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
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
  genderGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputError: {
    borderBottomColor: 'red',
  },
  textError: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  registerButton: {
    height: SIZES.size_50,
    borderRadius: SIZES.size_12,
    marginTop: SIZES.padding,
    backgroundColor: COLORS.primary
  },
  loginButton: {
    height: SIZES.size_50,
    borderRadius: SIZES.size_12,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    marginTop: SIZES.size_15,
  },
  buttonText: {
    fontSize: 22,
    color: COLORS.white
  },
  buttonContainHorizontal: {
    flexDirection: 'row',
    marginTop: 5,
  },
  successField: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textSuccess: {
    fontSize: 18,
    fontWeight: '500',
    color: '#009387',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#009387',
  },
  buttonModal: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 2,
    backgroundColor: '#009387',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default RegisterComponent;
