import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk-next';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useSignIn} from '../../services/authAPI';
import {useDispatch} from 'react-redux';
import {handlerSignIn} from '../../redux/actions/authAction';
import {SetAccessTokenToStorage} from '../../utils/storage';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('email không hợp lệ')
    .required('email không được bỏ trống'),
  password: Yup.string()
    .min(5, 'mật khẩu tối thiểu 5 kí tự')
    .max(8, 'mật khẩu tối đa 8 kí tự')
    .required('mật khẩu không được bỏ trống'),
});

const SignInScreen = ({navigation}) => {
  const [isEntryPwd, setEntryPwd] = useState(true);

  const [msgSignIn, setMsgSignIn] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const handleSignIn = values => {
    useSignIn(values)
      .then(res => {
        if (res.data.statusCode === 200) {
          SetAccessTokenToStorage(res.data.content.accessToken);

          dispatch(handlerSignIn(res.data.content.accessToken));
        }
      })
      .catch(err => {
        setModalVisible(!isModalVisible);

        setMsgSignIn(`${err.response.data.message}`);

        console.log(err);
      });
  };

  const handlerEntryPassword = () => {
    setEntryPwd(!isEntryPwd);
  };

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
            console.log('result-->', result);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.text_header}>Login Now!</Text>
      </View>
      {/* HEADER */}

      {/* MODAL */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {msgSignIn !== '' && msgSignIn} Vui lòng đăng nhập lại.
            </Text>
            <TouchableOpacity
              style={[styles.buttonModal]}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text style={styles.textStyle}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* MODAL */}

      {/* FOOTER */}
      <Formik
        validationSchema={SignInSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSignIn}>
        {({values, errors, handleChange, handleSubmit}) => (
          <>
            <Animatable.View
              style={styles.footer}
              animation="fadeInUpBig"
              delay={500}>
              {/* EMAIL */}
              <Text style={styles.text_footer}>Email</Text>
              <View
                style={[styles.input_field, errors.email && styles.inputError]}>
                <FontAwesome name="user-o" color={'#009387'} size={20} />
                <TextInput
                  placeholder="Your Email"
                  placeholderTextColor="#666666"
                  style={styles.textInput}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  value={values.email}
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
              {errors.email && (
                <Text style={styles.textError}>{errors.email}</Text>
              )}
              {/* ERROR EMAIL */}

              {/* EMAIL */}

              {/* PASSWORD */}
              <Text style={[styles.text_footer, {marginTop: 20}]}>
                Password
              </Text>
              <View
                style={[
                  styles.input_field,
                  errors.password && styles.inputError,
                ]}>
                <Feather name="lock" color={'#009387'} size={20} />
                <TextInput
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={isEntryPwd ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                />

                {/* SECURE ENTRY TEXT */}
                <TouchableOpacity onPress={handlerEntryPassword}>
                  {isEntryPwd ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
                {/* SECURE ENTRY TEXT */}
              </View>
              {/* PASSWORD */}

              {/* ERROR PASSWORD */}
              {errors.password && (
                <Text style={styles.textError}>{errors.password}</Text>
              )}
              {/* ERROR PASSWORD */}

              {/* FORGOT PASSWORD BUTTON */}
              <TouchableOpacity>
                <Text style={{color: '#009387', marginTop: 15}}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              {/* FORGOT PASSWORD BUTTON */}

              {/* SIGN IN - SIGN UP BUTTON */}
              <View style={styles.button}>
                {/* SIGN IN */}
                <TouchableOpacity onPress={handleSubmit}>
                  <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}>
                    <Text style={styles.textSignIn}>Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>
                {/* SIGN IN */}

                {/* SIGN UP */}
                <TouchableOpacity
                  onPress={() => navigation.push('SignUpScreen')}
                  style={styles.signUp}>
                  <Text style={styles.textSignUp}>Sign Up</Text>
                </TouchableOpacity>
                {/* SIGN UP */}

                {/* SIGN IN WITH */}
                <View style={styles.signInWith}>
                  <View style={styles.borderLeft}></View>
                  <Text style={styles.textSignOther}>Or sign in with</Text>
                  <View style={styles.borderRight}></View>
                </View>
                {/* SIGN IN WITH */}

                <View style={styles.signInOther}>
                  {/* FACEBOOK */}
                  <TouchableOpacity
                    style={styles.signInFB}
                    onPress={() => loginWithFacebook()}>
                    <View style={styles.borderIconFB}>
                      <FontAwesome name="facebook" color={'#fff'} size={25} />
                    </View>
                  </TouchableOpacity>
                  {/* FACEBOOK */}

                  {/* GOOGLE */}
                  <TouchableOpacity style={styles.signInGG}>
                    <View style={styles.borderIconGG}>
                      <FontAwesome
                        name="google-plus"
                        color={'#fff'}
                        size={25}
                      />
                    </View>
                  </TouchableOpacity>
                  {/* GOOGLE */}

                  {/* TWITTER */}
                  <TouchableOpacity style={styles.signInTwitter}>
                    <View style={styles.borderIconTwitter}>
                      <FontAwesome name="twitter" color={'#fff'} size={25} />
                    </View>
                  </TouchableOpacity>
                  {/* TWITTER */}

                  {/* INSTAGRAM */}
                  <TouchableOpacity style={styles.signInInsta}>
                    <LinearGradient
                      colors={['#fd5949', '#d6249f', '#285AEB']}
                      style={styles.borderIconInsta}>
                      <View>
                        <FontAwesome
                          name="instagram"
                          color={'#fff'}
                          size={25}
                        />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* INSTAGRAM */}
                </View>
              </View>
              {/* SIGN IN - SIGN UP BUTTON */}
            </Animatable.View>
          </>
        )}
      </Formik>
      {/* FOOTER */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  input_field: {
    flexDirection: 'row',
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
    fontSize: 18,
  },
  button: {
    flexDirection: 'column',
    marginTop: 20,
  },
  signIn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  textSignIn: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  signUp: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: '#009387',
    borderWidth: 1,
    marginTop: 10,
  },
  textSignUp: {
    fontSize: 18,
    color: '#009387',
    fontWeight: 'bold',
  },
  textSignOther: {
    color: '#009387',
    fontWeight: '500',
    fontSize: 15,
  },
  linearGradient: {
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  signInWith: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderLeft: {
    borderColor: '#009387',
    borderWidth: 1,
    width: 100,
    marginRight: 5,
  },
  borderRight: {
    borderColor: '#009387',
    borderWidth: 1,
    width: 100,
    marginLeft: 5,
  },
  signInOther: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  borderIconFB: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInFB: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  signInGG: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  borderIconGG: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff4500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInTwitter: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  borderIconTwitter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00bfff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInInsta: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  borderIconInsta: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputError: {
    borderBottomColor: 'red',
  },
  textError: {
    color: 'red',
    marginTop: 5,
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

export default SignInScreen;
