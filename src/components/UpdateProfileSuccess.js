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

const UpdateProfileSuccess = ({
  isModalVisible,
  toggleModal,
  modalContent,
  updateSuccess,
}) => {
  // use navigation
  const navigation = useNavigation();

  const handlerClickButton = () => {
    if (updateSuccess) {
      toggleModal();
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
              name={updateSuccess ? iconSuccess : iconFailed}
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
              style={styles.btnOkStyle}
              onPress={handlerClickButton}>
              <Text style={styles.btnOkText}>
                {updateSuccess ? 'OK' : 'TRY AGAIN'}
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
    backgroundColor: COLORS.gainsboro,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
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
    fontSize: 22,
    fontWeight: '500',
  },
});

export default UpdateProfileSuccess;
