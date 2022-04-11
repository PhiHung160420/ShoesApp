import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { Fragment, useState, useEffect } from 'react';
import {
  Modal, StyleSheet, Text,
  TouchableOpacity, View,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeButton, InputFormik, TextButton } from '../../common';
import SIZES from '../../../constants/sizes/index';
import COLORS from '../../../constants/colors/index';
import { CONSTANST } from '../../../constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useKeyboard } from '../../../hooks';

const LoginComponent = (props) => {
  const {
    isModalVisible,
    messageLogin,
    signInValidateSchema,
    onPressLogin,
    loginWithFacebook,
    setModalVisible,
  } = props;

  const navigation = useNavigation();

  const keyboardHeight = useKeyboard();

  const [isEntryPassword, setIsEntryPassword] = useState(true);

  const insets = useSafeAreaInsets();

  return (
    <Fragment>
      <KeyboardAvoidingView
        behavior={CONSTANST.isIOS ? "padding" : null}
        keyboardVerticalOffset={CONSTANST.isIOS ? 40 + insets.bottom : 0}
        onPress={Keyboard.dismiss}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Login Now!</Text>
            </View>

            <Modal animationType="slide" transparent={true} visible={isModalVisible}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{messageLogin !== '' && messageLogin} Vui lòng kiểm tra lại thông tin đăng nhập.</Text>
                  <TouchableOpacity
                    style={[styles.buttonModal]}
                    onPress={() => setModalVisible(!isModalVisible)}>
                    <Text style={styles.textStyle}>Đồng ý</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Formik
              validationSchema={signInValidateSchema}
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={onPressLogin}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Animatable.View style={styles.content} animation="fadeInUpBig" delay={500}>
                  <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: keyboardHeight}}>
                    <InputFormik 
                      title="Email"
                      icon="user-o"
                      placeholder="email address"
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                      inputName="email"
                    />

                    <InputFormik
                      isPassword
                      title="Password"
                      icon="lock"
                      placeholder="password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      error={errors.password}
                      touched={touched.password}
                      inputName="password"
                      isEntryPassword={isEntryPassword}
                      containerStyle={{marginTop: SIZES.padding}}
                      handlerEntryPassword={() => setIsEntryPassword(!isEntryPassword)}
                    />

                    <TextButton 
                      title="Forgot password?"
                      buttonContainerStyle={styles.forgotPasswordButton}
                      titleStyle={styles.titleForgetPassword}
                    />

                    <TextButton 
                      title="Login"
                      buttonContainerStyle={styles.loginButton}
                      titleStyle={styles.loginButtonTitle}
                      onPress={handleSubmit}
                    />

                    <TextButton 
                      title="Register"
                      buttonContainerStyle={styles.registerButton}
                      titleStyle={styles.registerButtonTitle}
                      onPress={() => navigation.push('RegisterScreen')}
                    />

                    <View style={styles.signInWith}>
                      <View style={styles.borderLeft} />
                      <Text style={styles.textSignOther}>or log in with</Text>
                      <View style={styles.borderRight} />
                    </View>

                    <View style={styles.buttonSocial}>
                      <FontAwesomeButton 
                        icon="facebook"
                        iconColor={COLORS.white}
                        iconSize={25}
                        buttonContainerStyle={styles.facebookButton}
                        onPress={loginWithFacebook}
                      />

                      <FontAwesomeButton 
                        icon="google-plus"
                        iconColor={COLORS.white}
                        iconSize={25}
                        buttonContainerStyle={styles.googleButton}
                      />

                      <FontAwesomeButton 
                        icon="twitter"
                        iconColor={COLORS.white}
                        iconSize={25}
                        buttonContainerStyle={styles.twitterButton}
                      />

                      <TouchableOpacity>
                        <LinearGradient colors={['#fd5949', '#d6249f', '#285AEB']} style={styles.buttonInstagram}>
                          <FontAwesome name="instagram" color={COLORS.white} size={25} />
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </Animatable.View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    height: '100%'
  },
  header: {
    height: SIZES.size_200,
    justifyContent: 'flex-end',
    paddingHorizontal: SIZES.size_20,
    paddingVertical: SIZES.size_30,
  },
  content: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.size_40,
    borderTopRightRadius: SIZES.size_40,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    height: '100%',
  },
  headerTitle: {
    fontSize: SIZES.size_30,
    fontWeight: 'bold',
    color: COLORS.white,
    fontFamily: 'Roboto Mono',
  },
  loginButton: {
    width: '100%',
    paddingVertical: SIZES.size_10,
    borderRadius: SIZES.size_20,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.padding
  },
  loginButtonTitle: {
    color: COLORS.white,
  },
  registerButton: {
    width: '100%',
    paddingVertical: SIZES.size_10,
    borderRadius: SIZES.size_20,
    borderColor: '#009387',
    backgroundColor: 'transparent',
    borderWidth: 1,
    marginTop: SIZES.size_10,
  },
  registerButtonTitle: {
    color: '#009387',
  },
  textSignOther: {
    color: '#009387',
    fontWeight: '500',
    fontSize: SIZES.size_15,
    fontFamily: 'Roboto Mono',
  },
  signInWith: {
    marginTop: SIZES.size_30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderLeft: {
    borderColor: '#009387',
    borderWidth: 1,
    width: SIZES.size_100,
    marginRight: SIZES.size_5,
  },
  borderRight: {
    borderColor: '#009387',
    borderWidth: 1,
    width: SIZES.size_100,
    marginLeft: SIZES.size_5,
  },
  buttonSocial: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    justifyContent: 'center',
  },
  buttonInstagram: {
    width: SIZES.size_40,
    height: SIZES.size_40,
    borderRadius: SIZES.size_20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.base
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.size_22,
  },
  modalView: {
    margin: SIZES.size_20,
    backgroundColor: 'white',
    borderRadius: SIZES.size_20,
    padding: SIZES.size_35,
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
    borderRadius: SIZES.size_20,
    paddingHorizontal: SIZES.size_20,
    paddingVertical: SIZES.size_5,
    elevation: 2,
    backgroundColor: '#009387',
  },
  textStyle: {
    color: 'white',
    fontSize: SIZES.size_18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: SIZES.size_15,
    textAlign: 'center',
    fontSize: SIZES.size_18,
    fontWeight: '500',
  },
  titleForgetPassword: {
    color: '#009387',
    marginTop: SIZES.radius,
    fontSize: SIZES.size_16,
    fontFamily: 'Roboto Mono',
  },
  forgotPasswordButton: {
    backgroundColor: 'transparent',
    alignItems: 'flex-start'
  },
  facebookButton: {
    backgroundColor: COLORS.blue,
  },
  googleButton: {
    backgroundColor: COLORS.orange,
    marginLeft: SIZES.base
  },
  twitterButton: {
    backgroundColor: COLORS.lightBlue,
    marginLeft: SIZES.base
  }
});

export default LoginComponent;
