import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {COLORS} from '../constants/colors.constants';
import {SIZES} from '../constants/sizes.constants';
import {getAccessTokenSelector} from '../redux/selectors/authSelector';
import {changePasswordAPI} from '../services/profileAPI';
import {useNavigation} from '@react-navigation/native';

const iconSuccess = 'smile-o';
const iconFailed = 'frown-o';

const UpdateModal = ({isModalVisible, toggleModal}) => {
  // get access token
  const token = useSelector(getAccessTokenSelector);

  // use navigation
  const navigation = useNavigation();

  // state entry new password
  const [secureNewPwd, setsecureNewPwd] = useState(false);

  // state validate new password
  const [validPassword, setValidPassword] = useState({
    isValid: true,
    msgError: '',
  });

  // state new Password
  const [password, setPassword] = useState({
    newPassword: '',
  });

  // state change password success
  const [isSuccess, setIsSuccess] = useState(false);

  // state message show modal
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
  });

  // state show hide modal
  const [showModalSuccess, setShowModalSuccess] = useState(false);

  // handler click entry password
  const handlerEntryNewPwd = () => {
    setsecureNewPwd(!secureNewPwd);
  };

  // handler change password
  const handlerChangePassword = val => {
    if (val.trim().length >= 6) {
      setValidPassword({...validPassword, isValid: true});
      setPassword({
        newPassword: val,
      });
    } else {
      setValidPassword({
        isValid: false,
        msgError: 'Password at least 6 character length !',
      });
    }
  };

  // handler click change password
  const handlerClickChangePassword = () => {
    if (!validPassword.isValid) {
      setValidPassword({
        isValid: false,
        msgError: 'Password at least 6 character length !',
      });
    } else if (isSuccess) {
      navigation.navigate('ProfileScreen');
      toggleModal();
    } else {
      changePasswordAPI(password, token)
        .then(res => {
          if (res.data.statusCode === 200) {
            setIsSuccess(true);
            setShowModalSuccess(!showModalSuccess);
            setModalContent({
              title: 'Successfully',
              message: 'Change password successfully !',
            });
          }
        })
        .catch(err => {
          setIsSuccess(false);
          setShowModalSuccess(!showModalSuccess);
          setModalContent({
            title: 'Failed',
            message: 'Change password failed! Please try again.',
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut">
        {/* TITLE */}
        <Text style={styles.title}>{isSuccess ? '' : 'CHANGE PASSWORD'}</Text>
        {/* TITLE */}

        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: showModalSuccess
                ? COLORS.orange
                : COLORS.gainsboro,
              height: showModalSuccess
                ? SIZES.height / 4 + 50
                : SIZES.height / 4 + 20,
            },
          ]}>
          {showModalSuccess ? (
            <>
              <View style={styles.modalContent}>
                <FontAwesome
                  name={isSuccess ? iconSuccess : iconFailed}
                  size={100}
                  color={COLORS.white}
                />
                <Text style={styles.titleStyle}>{modalContent.title}</Text>
                <Text style={styles.msgModalStyle}>{modalContent.message}</Text>
              </View>
            </>
          ) : (
            <View style={styles.newPasswordContainer}>
              <Text style={styles.newPassText}>New Password</Text>
              <View style={styles.fieldStyle}>
                <TextInput
                  style={[
                    styles.newPassInputStyle,
                    {
                      borderBottomColor: validPassword.isValid
                        ? COLORS.black
                        : COLORS.red,
                    },
                  ]}
                  placeholder="new password"
                  secureTextEntry={true}
                  secureTextEntry={secureNewPwd}
                  onChangeText={val => handlerChangePassword(val)}
                />

                {/* SECURE ENTRY TEXT */}
                <TouchableOpacity onPress={handlerEntryNewPwd}>
                  {secureNewPwd ? (
                    <Feather name="eye" color={COLORS.black} size={20} />
                  ) : (
                    <Feather name="eye-off" color={COLORS.black} size={20} />
                  )}
                </TouchableOpacity>
                {/* SECURE ENTRY TEXT */}
              </View>
              {/* ERROR MESSAGE USERNAME */}
              {validPassword.isValid == false && (
                <Text style={styles.textError}>{validPassword.msgError}</Text>
              )}
              {/* ERROR MESSAGE USERNAME */}
            </View>
          )}

          <View
            style={[
              styles.buttonContainer,
              {
                justifyContent: isSuccess ? 'center' : 'space-between',
              },
            ]}>
            {/* BUTTON CANCEL */}
            {isSuccess ? null : (
              <TouchableOpacity
                style={styles.btnCancelStyle}
                onPress={toggleModal}>
                <Text style={styles.btnCancelText}>CANCEL</Text>
              </TouchableOpacity>
            )}
            {/* BUTTON CANCEL */}

            {/* BUTTON UPDATE */}
            <TouchableOpacity
              style={styles.btnUpdateStyle}
              onPress={handlerClickChangePassword}>
              <Text style={styles.btnUpdateText}>
                {showModalSuccess ? 'OK' : 'CHANGE'}
              </Text>
            </TouchableOpacity>
            {/* BUTTON UPDATE */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
    fontFamily: 'Roboto Mono',
  },
  modalContainer: {
    borderRadius: SIZES.radius,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  fieldStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  newPasswordContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  newPassInputStyle: {
    borderBottomWidth: 0.5,
    height: 30,
    fontSize: 18,
    width: '95%',
    fontFamily: 'Roboto Mono',
  },
  newPassText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  btnUpdateStyle: {
    width: 130,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius * 2,
  },
  btnUpdateText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  btnCancelStyle: {
    paddingHorizontal: 35,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius * 2,
  },
  btnCancelText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  modalContent: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textError: {
    color: COLORS.red,
    marginTop: 5,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  msgModalStyle: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default UpdateModal;
