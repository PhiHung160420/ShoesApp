import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../constants/colors.constants';
import {SIZES} from '../constants/sizes.constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {removeAccessTokenInStorage} from '../utils/storage';
import {handlerSignOut} from '../redux/actions/authAction';
import {handlerSession} from '../redux/actions/profileAction';
import {handlerSetLoading} from '../redux/actions/loadingAction';

const PopupSession = ({handlerShowHidePopup, showHidePopup}) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handlerClickButton = async () => {
    handlerShowHidePopup();
    await removeAccessTokenInStorage();
    dispatch(handlerSignOut(null));
    dispatch(handlerSession(true));
    dispatch(handlerSetLoading(true));
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={showHidePopup}
        animationIn="zoomIn"
        animationOut="zoomOut">
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Image
              source={require('../assets/icons/login.png')}
              style={styles.iconStyle}
            />
            <Text style={styles.titleStyle}>Authentication</Text>
            <Text style={styles.msgPopupContent}>
              Phiên làm việc đã hết hạn. Hãy đăng nhập lại!
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnOkStyle}
              onPress={handlerClickButton}>
              <Text style={styles.btnOkText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    height: SIZES.height / 3,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  popupContent: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 25,
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  msgPopupContent: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'Roboto Mono',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: COLORS.gainsboro,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  btnCancelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  btnOkStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
    height: '100%',
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  btnOkText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  iconStyle: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default PopupSession;
