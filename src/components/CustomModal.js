import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, SIZES} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getAccessTokenSelector} from '../redux/selectors/authSelector';
import {getProfile} from '../services/profileAPI';

const iconSuccess = 'smile-o';
const iconFailed = 'frown-o';

const CustomModal = ({
  isModalVisible,
  toggleModal,
  modalContent,
  isSuccess,
}) => {
  // use navigation
  const navigation = useNavigation();

  const handlerClickButton = () => {
    if (isSuccess) {
      navigation.navigate('ProfileScreen');
    } else {
      toggleModal();
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FontAwesome
              name={isSuccess ? iconSuccess : iconFailed}
              size={100}
              color={COLORS.white}
            />
            <Text style={styles.titleStyle}>
              {modalContent && modalContent.title}
            </Text>
            <Text style={styles.msgModalStyle}>
              {modalContent && modalContent.message}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnCancelStyle}
              onPress={toggleModal}>
              <Text style={styles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnOkStyle}
              onPress={handlerClickButton}>
              <Text style={styles.btnOkText}>
                {isSuccess ? 'Ok' : 'Try again'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: SIZES.height / 3 - 30,
    backgroundColor: COLORS.orange,
    borderRadius: SIZES.radius,
  },
  modalContent: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontSize: 25,
    color: COLORS.white,
    fontWeight: '500',
  },
  msgModalStyle: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  btnCancelText: {
    fontSize: 20,
    fontWeight: '500',
  },
  btnOkStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
    height: '100%',
    borderBottomRightRadius: SIZES.radius,
  },
  btnOkText: {
    fontSize: 20,
    fontWeight: '500',
  },
});

export default CustomModal;
