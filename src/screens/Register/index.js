import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSignUp} from '../../services/authAPI';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'tên đăng nhập quá ngắn')
    .max(50, 'tên đăng nhập quá dài')
    .required('tên đăng nhập không được bỏ trống'),
  email: Yup.string()
    .email('email không hợp lệ')
    .required('email không được bỏ trống'),
  phone: Yup.string()
    .min(10, 'số điện thoại không hợp lệ')
    .max(10, 'số điện thoại không hợp lệ')
    .matches(phoneRegExp, 'số điện thoại không hợp lệ')
    .required('số điện thoại không được bỏ trống'),
  password: Yup.string()
    .min(5, 'mật khẩu tối thiểu 5 kí tự')
    .max(8, 'mật khẩu tối đa 8 kí tự')
    .required('mật khẩu không được bỏ trống'),
});

const SignUpScreen = ({navigation}) => {
  // state entry password
  const [isEntryPwd, setEntryPwd] = useState(true);

  // state lưu giới tính được chọn
  const [gender, setGender] = useState(true);

  // state đăng ký thành công
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(true);

  // state hiển thị modal
  const [isModalVisible, setModalVisible] = useState(false);

  // state lưu thông báo cho người dùng
  const [msgSignUp, setMsgSignUp] = useState('');

  const handleSubmitFormik = values => {
    const data = {...values, gender};
    if (data) {
      useSignUp(data)
        .then(res => {
          setIsSignUpSuccess(true);
          setModalVisible(!isModalVisible);
          setMsgSignUp(`${res.data.message}!`);
        })
        .catch(err => {
          setIsSignUpSuccess(false);
          setModalVisible(!isModalVisible);
          setMsgSignUp(`${err.response.data.message}`);
        });
    }
  };

  // handle set state when click entry text password
  const handlerEntryPassword = () => {
    setEntryPwd(!isEntryPwd);
  };

  const handlerClickModal = () => {
    if (isSignUpSuccess) {
      setModalVisible(!isModalVisible);
      navigation.push('SignInScreen');
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      {/* HEADER */}

      {/* MODAL */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {isSignUpSuccess && msgSignUp !== ''
                ? `${msgSignUp} Vui lòng chọn tiếp tục để đăng nhập`
                : `${msgSignUp} Vui lòng đăng ký lại.`}
            </Text>
            <TouchableOpacity
              style={[styles.buttonModal]}
              onPress={handlerClickModal}>
              <Text style={styles.textStyle}>
                {isSignUpSuccess ? 'Tiếp Tục' : 'Đồng Ý'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* MODAL */}

      {/* FOOTER */}
      <Formik
        validationSchema={SignupSchema}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          password: '',
        }}
        onSubmit={handleSubmitFormik}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <Animatable.View
              animation="fadeInUpBig"
              delay={500}
              style={styles.footer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* USERNAME */}
                <Text style={styles.text_footer}>Username</Text>
                <View
                  style={[
                    styles.action,
                    errors.name && touched.name && styles.inputError,
                  ]}>
                  <FontAwesome name="user-o" color="#05375a" size={20} />
                  <TextInput
                    name="name"
                    placeholder="usename"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />

                  {/* CHECK USERNAME */}
                  {!errors.name && values.name.length !== 0 && (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  )}
                  {/* CHECK USERNAME */}
                </View>

                {/* ERROR USERNAME */}
                {errors.name && touched.name && (
                  <Text style={styles.textError}>{errors.name}</Text>
                )}
                {/* ERROR USERNAME */}

                {/* USERNAME */}

                {/* EMAIL */}
                <Text style={[styles.text_footer, {marginTop: 15}]}>Email</Text>
                <View
                  style={[
                    styles.action,
                    errors.email && touched.email && styles.inputError,
                  ]}>
                  <FontAwesome name="envelope-open" color="#05375a" size={20} />
                  <TextInput
                    name="email"
                    placeholder="email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                  />

                  {/* CHECK EMAIL */}
                  {!errors.email && (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  )}
                  {/* CHECK EMAIL */}
                </View>

                {/* ERROR EMAIL */}
                {errors.email && touched.email && (
                  <Text style={styles.textError}>{errors.email}</Text>
                )}
                {/* ERROR EMAIL */}

                {/* EMAIL */}

                {/* PHONE */}
                <Text style={[styles.text_footer, {marginTop: 15}]}>Phone</Text>
                <View
                  style={[
                    styles.action,
                    errors.phone && touched.phone && styles.inputError,
                  ]}>
                  <FontAwesome name="phone" color="#05375a" size={20} />
                  <TextInput
                    name="phone"
                    placeholder="phone"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType="phone-pad"
                  />

                  {/* CHECK PHONE */}
                  {!errors.phone && (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  )}
                  {/* CHECK PHONE */}
                </View>

                {/* ERROR PHONE */}
                {errors.phone && touched.phone && (
                  <Text style={styles.textError}>{errors.phone}</Text>
                )}
                {/* ERROR PHONE */}

                {/* PHONE */}

                {/* GENDER */}
                <Text style={[styles.text_footer, {marginTop: 10}]}>
                  Gender
                </Text>
                <View style={styles.buttonContainHorizontal}>
                  <TouchableOpacity
                    style={
                      gender == true
                        ? styles.buttonSelect
                        : styles.buttonNonSelect
                    }
                    onPress={() => setGender(true)}>
                    <Text
                      style={
                        gender == true
                          ? styles.buttonTextSelect
                          : styles.buttonTextNonSelect
                      }>
                      Male
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      gender == false
                        ? styles.buttonSelect
                        : styles.buttonNonSelect
                    }
                    onPress={() => setGender(false)}>
                    <Text
                      style={
                        gender == false
                          ? styles.buttonTextSelect
                          : styles.buttonTextNonSelect
                      }>
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* GENDER */}

                {/* PASSWORD */}
                <Text style={[styles.text_footer, {marginTop: 15}]}>
                  Password
                </Text>
                <View
                  style={[
                    styles.action,
                    errors.password && touched.password && styles.inputError,
                  ]}>
                  <Feather name="lock" color="#05375a" size={20} />
                  <TextInput
                    name="password"
                    placeholder="password"
                    secureTextEntry={isEntryPwd ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />

                  {/* SECURE ENTRY TEXT */}
                  <TouchableOpacity onPress={handlerEntryPassword}>
                    {isEntryPwd ? (
                      <Feather name="eye" color="grey" size={20} />
                    ) : (
                      <Feather name="eye-off" color="grey" size={20} />
                    )}
                  </TouchableOpacity>
                  {/* SECURE ENTRY TEXT */}
                </View>

                {/* ERROR PASSWORD */}
                {errors.password && touched.password && (
                  <Text style={styles.textError}>{errors.password}</Text>
                )}
                {/* ERROR PASSWORD */}

                {/* PASSWORD */}

                <View style={styles.button}>
                  {/* SIGN UP */}
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={handleSubmit}>
                    <LinearGradient
                      colors={['#08d4c4', '#01ab9d']}
                      style={styles.signIn}>
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: '#fff',
                          },
                        ]}>
                        Sign Up
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  {/* SIGN UP */}

                  {/* SIGN IN */}
                  <TouchableOpacity
                    onPress={() => navigation.push('SignInScreen')}
                    style={[
                      styles.signIn,
                      {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: '#009387',
                        },
                      ]}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  {/* SIGN IN */}
                </View>
              </ScrollView>
            </Animatable.View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    height: 150,
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Roboto Mono',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 22,
    fontFamily: 'Roboto Mono',
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
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  buttonContainHorizontal: {
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonNonSelect: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c1c1c1',
  },
  buttonSelect: {
    flexDirection: 'row',
    backgroundColor: '#00bfa5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonTextSelect: {
    fontSize: 14,
    color: '#fafafa',
    paddingHorizontal: 10,
    fontFamily: 'Roboto Mono',
  },
  buttonTextNonSelect: {
    fontSize: 14,
    color: '#777',
    paddingHorizontal: 10,
    fontFamily: 'Roboto Mono',
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

export default SignUpScreen;
