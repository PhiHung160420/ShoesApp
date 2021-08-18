import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES} from '../../constants';
import {actFetchGetProfileRequest} from '../../redux/actions/profileAction';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import Materia from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {updateProfileAPI, uploadAvatarAPI} from '../../services/profileAPI';
import UpdateProfileSuccess from '../../components/UpdateProfileSuccess';
import UploadPhoto from './UploadPhoto';
import ImagePicker from 'react-native-image-crop-picker';

const iconName = 'arrow-back-outline';

const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const createFormData = photo => {
  const data = new FormData();

  data.append('photo', {
    name: photo.filename,
    type: photo.mime,
    uri:
      Platform.OS === 'ios'
        ? photo.sourceURL.replace('file://', '')
        : photo.sourceURL,
  });

  return data;
};

const UpdateProfile = ({route}) => {
  // get my profile
  const {profile} = route.params;

  // use dispatch
  const dispatch = useDispatch();

  // get access token
  const accessToken = useSelector(getAccessTokenSelector);

  // get theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state data object
  const [data, setData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    gender: profile.gender,
    password: profile.password,
  });

  // state entry password
  const [secureTextEntry, setsecureTextEntry] = useState(false);

  // state update success
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // state message show modal
  const [modalContent, setModalContent] = useState({});

  // state show modal
  const [isModalVisible, setModalVisible] = useState(false);

  // state photo
  const [photo, setPhoto] = useState(null);

  // state upload success
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // state show hide panel
  const [showPanel, setShowPanel] = useState(false);

  // state gender selected (true = male, false = female)
  const [gender, setGender] = useState(data.gender);

  // state validate
  const [validate, setValidate] = useState({
    name: {
      isValid: true,
      msgError: 'User name must have 4 character long !',
    },
    email: {
      isValid: true,
      msgError: 'Email invalid !',
    },
    phone: {
      isValid: true,
      msgError: 'Phone number invalid !',
    },
    password: {
      isValid: true,
      msgError: 'Password at least 6 characters !',
    },
  });

  // handler click entry password
  const handlerEntryPassword = () => {
    setsecureTextEntry(!secureTextEntry);
  };

  // handler validate username
  const handlerValidUsername = value => {
    if (value.trim().length >= 4) {
      setData({...data, name: value});
      setValidate({...validate, name: {...validate.name, isValid: true}});
    } else {
      setData({...data, name: value});
      setValidate({...validate, name: {...validate.name, isValid: false}});
    }
  };

  // handler validate email
  const handlerValidEmail = value => {
    if (value.match(regexEmail)) {
      setData({...data, email: value});
      setValidate({...validate, email: {...validate.email, isValid: true}});
    } else {
      setData({...data, email: value});
      setValidate({...validate, email: {...validate.email, isValid: false}});
    }
  };

  // handler validate phone
  const handlerValidPhone = value => {
    if (value.match(regexPhone)) {
      setData({...data, phone: value});
      setValidate({...validate, phone: {...validate.phone, isValid: true}});
    } else {
      setData({...data, phone: value});
      setValidate({...validate, phone: {...validate.phone, isValid: false}});
    }
  };

  // handler validate password
  const handlerValidPassword = value => {
    if (value.trim().length >= 6) {
      setData({...data, password: value});
      setValidate({
        ...validate,
        password: {...validate.password, isValid: true},
      });
    } else {
      setData({...data, password: value});
      setValidate({
        ...validate,
        password: {...validate.password, isValid: false},
      });
    }
  };

  // handler show hide modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // handler show hide panel
  const handlerShowHidePanel = () => {
    setShowPanel(!showPanel);
  };

  // update gender when change gender
  useEffect(() => {
    setData({...data, gender: gender});
  }, [gender]);

  //handler update profile
  const handlerUpdateProfile = () => {
    if (!data.password) {
      setValidate({
        ...validate,
        password: {...validate.password, isValid: false},
      });
      return;
    }
    if (
      validate.name.isValid !== false &&
      validate.phone.isValid !== false &&
      validate.password.isValid !== false
    ) {
      updateProfileAPI(data, accessToken)
        .then(res => {
          dispatch(actFetchGetProfileRequest(accessToken));
          setUpdateSuccess(true);
          setModalVisible(!isModalVisible);
          setModalContent({
            title: 'Successfully',
            message: 'Update profile successfully !',
          });
        })
        .catch(err => {
          setUpdateSuccess(false);
          setModalVisible(!isModalVisible);
          setModalContent({
            title: 'Failed',
            message: 'Update profile fail! Please check input again',
          });
        });
    }
  };

  //handler when click button take a photo
  const takePhotoFromCammara = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('image: ' + image);
      setShowPanel(false);
    });
  };

  // handler choose photo from library
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image);
      setShowPanel(false);
    });
  };

  // handler upload avatar
  const handlerClickUploadAvatar = () => {
    uploadAvatarAPI(createFormData(photo), accessToken)
      .then(res => {
        setUploadSuccess(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      {/* HEADER BAR */}
      <HeaderBar nameIcon={iconName}>
        <View style={styles.titleContainer}>
          <Text style={[styles.updateTitle, {color: appTheme.textColor}]}>
            UPDATE PROFILE
          </Text>
        </View>
      </HeaderBar>
      {/* HEADER BAR */}

      {/* MODAL */}
      {isModalVisible && (
        <UpdateProfileSuccess
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          modalContent={modalContent}
          updateSuccess={updateSuccess}
        />
      )}
      {/* MODAL */}

      <View
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme.subBackgroundColor},
        ]}>
        {/* AVATAR */}
        <View
          style={[
            styles.avatarProfileContainer,
            {marginTop: photo ? (uploadSuccess ? -60 : -40) : -60},
          ]}>
          <View style={styles.avatarContainer}>
            {/* IMAGES */}
            <Image
              source={{
                uri: photo ? photo.path : profile.avatar,
              }}
              style={styles.avatarStyle}
            />
            {/* IMAGES */}

            {uploadSuccess == false ? (
              photo ? (
                <TouchableOpacity
                  style={styles.uploadBtnStyle}
                  onPress={handlerClickUploadAvatar}>
                  <Text style={styles.uploadBtnText}>Upload</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.iconStyle}
                  onPress={handlerShowHidePanel}>
                  <Materia name="add-a-photo" size={30} color="white" />
                </TouchableOpacity>
              )
            ) : null}
          </View>
        </View>
        {/* AVATAR */}

        {/* INFO PROFILE */}
        <View style={[styles.infoProfileContainer]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* USERNAME */}
            <Text style={[styles.textField, {color: appTheme.textColor}]}>
              Username
            </Text>
            <View
              style={[
                styles.fieldStyle,
                {
                  borderBottomColor: validate.name.isValid
                    ? appTheme.borderBottomColor
                    : COLORS.red,
                },
              ]}>
              <FontAwesome name="user-o" color={appTheme.textColor} size={25} />
              <TextInput
                name="name"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="default"
                value={data.name}
                onChangeText={val => handlerValidUsername(val)}
              />

              {/* CHECK USERNAME */}
              {validate.name.isValid && (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              )}
              {/* CHECK USERNAME */}
            </View>

            {/* ERROR MESSAGE USERNAME */}
            {validate.name.isValid == false && (
              <Text style={styles.textError}>{validate.name.msgError}</Text>
            )}
            {/* ERROR MESSAGE USERNAME */}

            {/* USERNAME */}

            {/* EMAIL */}
            <Text
              style={[
                styles.textField,
                {color: appTheme.textColor, marginTop: 15},
              ]}>
              Email
            </Text>
            <View
              style={[
                styles.fieldStyle,
                {
                  borderBottomColor: validate.email.isValid
                    ? appTheme.borderBottomColor
                    : COLORS.red,
                },
              ]}>
              <FontAwesome
                name="envelope-open"
                color={appTheme.textColor}
                size={25}
              />
              <TextInput
                name="email"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={val => handlerValidEmail(val)}
                value={data.email}
              />

              {/* CHECK EMAIL */}
              {validate.email.isValid && (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              )}
              {/* CHECK EMAIL */}
            </View>

            {/* ERROR MESSAGE EMAIL */}
            {validate.email.isValid == false && (
              <Text style={styles.textError}>{validate.email.msgError}</Text>
            )}
            {/* ERROR MESSAGE EMAIL */}

            {/* EMAIL */}

            {/* PHONE */}
            <Text
              style={[
                styles.textField,
                {color: appTheme.textColor, marginTop: 15},
              ]}>
              Phone
            </Text>
            <View
              style={[
                styles.fieldStyle,
                {
                  borderBottomColor: validate.phone.isValid
                    ? appTheme.borderBottomColor
                    : COLORS.red,
                },
              ]}>
              <FontAwesome name="phone" color={appTheme.textColor} size={25} />
              <TextInput
                name="phone"
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="phone-pad"
                value={data.phone}
                onChangeText={val => handlerValidPhone(val)}
              />

              {/* CHECK PHONE */}
              {validate.phone.isValid && (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              )}
              {/* CHECK PHONE */}
            </View>

            {/* ERROR MESSAGE PHONE */}
            {validate.phone.isValid == false && (
              <Text style={styles.textError}>{validate.phone.msgError}</Text>
            )}
            {/* ERROR MESSAGE PHONE */}
            {/* PHONE */}

            {/* GENDER */}
            <Text
              style={[
                styles.textField,
                {color: appTheme.textColor, marginTop: 15},
              ]}>
              Gender
            </Text>
            <View style={styles.buttonContainHorizontal}>
              <TouchableOpacity
                style={
                  gender == true ? styles.buttonSelect : styles.buttonNonSelect
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
                  gender == false ? styles.buttonSelect : styles.buttonNonSelect
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
            <Text
              style={[
                styles.textField,
                {color: appTheme.textColor, marginTop: 15},
              ]}>
              Password
            </Text>
            <View
              style={[
                styles.fieldStyle,
                {
                  borderBottomColor: validate.password.isValid
                    ? appTheme.borderBottomColor
                    : COLORS.red,
                },
              ]}>
              <Feather name="lock" color={appTheme.textColor} size={25} />
              <TextInput
                name="password"
                style={styles.textInput}
                autoCapitalize="none"
                secureTextEntry={secureTextEntry}
                keyboardType="default"
                value={data.password}
                onChangeText={val => handlerValidPassword(val)}
              />

              {/* SECURE ENTRY TEXT */}
              <TouchableOpacity onPress={handlerEntryPassword}>
                {secureTextEntry ? (
                  <Feather name="eye" color={COLORS.black} size={20} />
                ) : (
                  <Feather name="eye-off" color={COLORS.black} size={20} />
                )}
              </TouchableOpacity>
              {/* SECURE ENTRY TEXT */}
            </View>

            {/* ERROR MESSAGE PASSWORD */}
            {validate.password.isValid == false && (
              <Text style={styles.textError}>{validate.password.msgError}</Text>
            )}
            {/* ERROR MESSAGE PASSWORD */}
            {/* PASSWORD */}
          </ScrollView>

          {/* BUTTON UPDATE */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handlerUpdateProfile}>
              <Text style={[styles.buttonText, {color: appTheme.textColor}]}>
                UPDATE
              </Text>
            </TouchableOpacity>
          </View>
          {/* BUTTON UPDATE */}
        </View>
        {/* INFO PROFILE */}
        {/* PANEL */}
        {showPanel ? (
          <UploadPhoto
            handlerShowHidePanel={handlerShowHidePanel}
            takePhotoFromCammara={takePhotoFromCammara}
            choosePhotoFromLibrary={choosePhotoFromLibrary}
          />
        ) : null}
        {/* PANEL */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 2,
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
    marginTop: -30,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  avatarProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarStyle: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  iconStyle: {
    position: 'absolute',
    left: '20%',
    top: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: SIZES.radius * 5,
  },
  infoProfileContainer: {
    flex: 4,
    paddingHorizontal: 20,
  },
  fieldStyle: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize: 20,
    color: COLORS.black,
  },
  textField: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  buttonContainHorizontal: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonNonSelect: {
    flexDirection: 'row',
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: '500',
    color: '#fafafa',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonTextNonSelect: {
    fontSize: 18,
    color: '#777',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -20,
  },
  buttonStyle: {
    paddingHorizontal: 50,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius * 2,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  textError: {
    color: COLORS.red,
    marginTop: 5,
  },
  uploadBtnStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    marginTop: 5,
    borderRadius: SIZES.radius,
  },
  uploadBtnText: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default UpdateProfile;
