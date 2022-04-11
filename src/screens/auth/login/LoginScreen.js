import React, { useState } from 'react';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { LoginComponent } from '../../../components';
import { loginAction } from '../../../redux/actions/authAction';
import { useSignIn } from '../../../services/authAPI';
import { SetAccessTokenToStorage } from '../../../utils/storage';

const signInValidateSchema = yup.object().shape({
  email: yup
    .string()
    .email('email không hợp lệ')
    .required('email không được bỏ trống'),
  password: yup
    .string()
    .min(5, 'mật khẩu tối thiểu 5 kí tự')
    .max(8, 'mật khẩu tối đa 8 kí tự')
    .required('mật khẩu không được bỏ trống'),
});

const LoginScreen = () => {
  const [messageLogin, setMessageLogin] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const onPressLogin = values => {
    useSignIn(values)
      .then(res => {
        SetAccessTokenToStorage(res.data.content.accessToken);
        dispatch(loginAction(res.data.content.accessToken));
      })
      .catch(err => {
        setModalVisible(!isModalVisible);
        setMessageLogin(`${err.response.data.message}`);
      });
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
          });
        }
      },
      function (error) {
        console.log(error);
      },
    );
  };

  return (
    <LoginComponent
      isModalVisible={isModalVisible}
      messageLogin={messageLogin}
      signInValidateSchema={signInValidateSchema}
      onPressLogin={onPressLogin}
      loginWithFacebook={loginWithFacebook}
      setModalVisible={setModalVisible}
    />
  );
};

export default LoginScreen;
