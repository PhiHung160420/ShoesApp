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

const UpdateModal = ({isModalVisible, toggleModal}) => {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut">
        <Text style={styles.title}>CHANGE PASSWORD</Text>
        <View style={styles.modalContainer}>
          {/* TITLE */}

          {/* TITLE */}
          {/* CURRENT PASSWORD */}
          <View style={styles.oldPasswordContainer}>
            <Text style={styles.oldPassText}>Current Password</Text>
            <TextInput
              style={styles.oldPassInputStyle}
              placeholder="current password"
              secureTextEntry={true}
            />
          </View>
          {/* CURRENT PASSWORD */}

          {/* NEW PASSWORD */}
          <View style={styles.newPasswordContainer}>
            <Text style={styles.newPassText}>New Password</Text>
            <TextInput
              style={styles.newPassInputStyle}
              placeholder="new password"
              secureTextEntry={true}
            />
          </View>
          {/* NEW PASSWORD */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnCancelStyle}
              onPress={toggleModal}>
              <Text style={styles.btnCancelText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnUpdateStyle}>
              <Text style={styles.btnUpdateText}>UPDATE</Text>
            </TouchableOpacity>
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
  },
  modalContainer: {
    height: SIZES.height / 3,
    backgroundColor: COLORS.gainsboro,
    borderRadius: SIZES.radius,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  oldPasswordContainer: {
    flexDirection: 'column',
  },
  newPasswordContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  oldPassInputStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.black,
    height: 30,
    fontSize: 18,
  },
  newPassInputStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.black,
    height: 30,
    fontSize: 18,
  },
  oldPassText: {
    fontSize: 20,
    fontWeight: '500',
  },
  newPassText: {
    fontSize: 20,
    fontWeight: '500',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnUpdateStyle: {
    paddingHorizontal: 35,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius * 2,
  },
  btnUpdateText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
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
  },
});

export default UpdateModal;
