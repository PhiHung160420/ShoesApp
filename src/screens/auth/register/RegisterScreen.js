import React, { useState } from 'react';
import * as Yup from 'yup';
import { RegisterComponent } from '../../../components';
import { navigateAndSetToTop } from '../../../navigations/service';
import { registerAPI } from '../../../services/authAPI';
import { phoneRegExp } from '../../../utils/validate';

const registerSchema = Yup.object().shape({
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

const RegisterScreen = ({navigation}) => {
  const [gender, setGender] = useState(true);

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(true);

  const [isModalVisible, setModalVisible] = useState(false);

  const [messageRegister, setMessageRegister] = useState('');

  const onPressRegister = values => {
    const data = {...values, gender};
    if (data) {
      registerAPI(data)
        .then(res => {
          setIsRegisterSuccess(true);
          setModalVisible(!isModalVisible);
          setMessageRegister(`${res.data.message}!`);
        })
        .catch(err => {
          setIsRegisterSuccess(false);
          setModalVisible(!isModalVisible);
          setMessageRegister(`${err?.response?.data?.message}`);
        });
    }
  };

  const handlerClickModal = () => {
    if (isRegisterSuccess) {
      setModalVisible(!isModalVisible);
      navigateAndSetToTop('LoginScreen');
    } else {
      setModalVisible(!isModalVisible);
    }
  };

  return (
    <RegisterComponent 
      registerSchema={registerSchema}
      isRegisterSuccess={isRegisterSuccess}
      gender={gender}
      isModalVisible={isModalVisible}
      messageRegister={messageRegister}
      setGender={setGender}
      onPressRegister={onPressRegister}
      handlerClickModal={handlerClickModal}
    />
  );
};

export default RegisterScreen;
