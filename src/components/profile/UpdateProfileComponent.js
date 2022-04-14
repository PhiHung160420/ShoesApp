import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet,
  Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import Materia from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { CustomPopup, HeaderBar, InputBase, ModalUpload, SwitchButton, TextButton } from '../../components/common';
import { COLORS, CONSTANST, ICONS, SIZES } from '../../constants';
import { appThemeSelector } from '../../redux/selectors/themeSelector';

const UpdateProfileComponent = (props) => {
  const {
    profile,
    isModalVisible,
    setModalVisible,
    modalContent,
    updateSuccess,
    photo,
    data,
    uploadSuccess,
    validate,
    showUploadModal,
    gender,
    handlerClickUploadAvatar,
    setGender,
    handlerUpdateProfile,
    setShowUploadModal,
    takePhotoFromCammara,
    choosePhotoFromLibrary,
    handleChangeText,
  } = props;

  const navigation = useNavigation();

  const appTheme = useSelector(appThemeSelector);

  const onPressButtonModal = () => {
    if (updateSuccess) {
      setModalVisible(false);
      navigation.navigate('ProfileScreen');
    } else {
      setModalVisible(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={CONSTANST.isIOS ? "padding" : null}
      keyboardVerticalOffset={CONSTANST.isIOS ? 64 : 0}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss(),
        setShowUploadModal(false)}}
      >
        <View style={styles.container}>
          <HeaderBar nameIcon={ICONS.arrow_back}>
            <Text style={[styles.title, {color: appTheme.textColor}]}>UPDATE PROFILE</Text>
          </HeaderBar>

          <CustomPopup 
            isVisible={isModalVisible}
            title={modalContent?.title}
            content={modalContent?.message}
            mainButton={updateSuccess ? "Ok" : "Try Again"}
            onPressMainButton={onPressButtonModal}
            icon={updateSuccess ? ICONS.success : ICONS.failed}
          />

          <View style={[styles.contentContainer, {backgroundColor: appTheme.subBackgroundColor}]}>
            <View style={styles.avatarContainer}>
              <View>
                <Image source={{uri: photo ? photo.path : profile.avatar}} style={styles.avatarImage} />

                {!uploadSuccess ? photo ?
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handlerClickUploadAvatar}>
                  <Text style={styles.uploadBtnText}>Upload</Text>
                </TouchableOpacity> :
                <TouchableOpacity
                  style={styles.iconButtonUpload}
                  onPress={() => setShowUploadModal(true)}>
                  <Materia name="add-a-photo" size={25} color="white" />
                </TouchableOpacity> : null}
              </View>
            </View>

            <View style={styles.infoProfileContainer}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: SIZES.size_200}}>
                <InputBase 
                  title="Username"
                  placeholder="Username"
                  isValid={validate?.name?.isValid}
                  errorMessage={validate?.name?.msgError}
                  icon="user-o"
                  inputName="name"
                  value={data?.name}
                  onChangeText={value => handleChangeText(value, "name")}
                />

                <InputBase 
                  title="Email"
                  placeholder="Email Address"
                  isValid={validate?.email?.isValid}
                  errorMessage={validate?.email?.msgError}
                  icon="envelope-open"
                  inputName="email"
                  keyboardType="email-address"
                  value={data?.email}
                  onChangeText={value => handleChangeText(value, "email")}
                  containerStyle={styles.marginTop}
                />

                <InputBase 
                  title="Phone Number"
                  placeholder="Phone Number"
                  isValid={validate?.phone?.isValid}
                  errorMessage={validate?.phone?.msgError}
                  icon="phone"
                  inputName="phone"
                  value={data?.phone}
                  onChangeText={value => handleChangeText(value, "phone")}
                  containerStyle={styles.marginTop}
                />

                <SwitchButton 
                  title="Gender"
                  value={gender}
                  label_1="Male"
                  label_2="Female"
                  onChangeValue={setGender}
                  containerStyle={styles.marginTop}
                />

                <TextButton 
                  title="UPDATE"
                  buttonContainerStyle={styles.buttonStyle}
                  titleStyle={styles.buttonText}
                  onPress={handlerUpdateProfile}
                />
              </ScrollView>
            </View>

            {showUploadModal &&
            <ModalUpload 
              onPressCancel={() => setShowUploadModal(false)}
              onPressTakePhoto={takePhotoFromCammara}
              onPressChooseFromLibrary={choosePhotoFromLibrary}
            />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    height: '100%',
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
    marginTop: -SIZES.size_30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
    textAlign: 'center'
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -SIZES.size_35
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  iconButtonUpload: {
    position: 'absolute',
    right: -SIZES.size_10,
    bottom: -SIZES.size_10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    width: SIZES.size_40,
    height: SIZES.size_40,
    borderRadius: SIZES.size_20,
  },
  infoProfileContainer: {
    paddingHorizontal: SIZES.size_15,
    marginTop: SIZES.padding
  },
  buttonStyle: {
    height: SIZES.size_50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius * 2,
    marginTop: SIZES.padding
  },
  buttonText: {
    fontSize: SIZES.size_22,
    fontWeight: '500',
    color: COLORS.white
  },
  uploadButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginTop: 5,
    borderRadius: SIZES.radius,
  },
  uploadBtnText: {
    fontSize: SIZES.size_18,
    fontWeight: '500',
    color: COLORS.white
  },
  marginTop: {
    marginTop: SIZES.padding
  }
});

export default UpdateProfileComponent;
