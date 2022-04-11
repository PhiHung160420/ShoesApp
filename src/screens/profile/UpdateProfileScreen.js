import React, { useEffect, useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfileComponent } from '../../components';
import { actFetchGetProfileRequest } from '../../redux/actions/profileAction';
import { getAccessTokenSelector } from '../../redux/selectors/authSelector';
import { updateProfileAPI, uploadAvatarAPI } from '../../services/profileAPI';
import { createFormData } from '../../utils/common';
import { validateEmail, validatePassword, validatePhoneNumber, validateUsername } from '../../utils/validate';

const UpdateProfileScreen = ({route}) => {
  const {profile} = route.params;

  const dispatch = useDispatch();

  const accessToken = useSelector(getAccessTokenSelector);

  const [data, setData] = useState({
    name: profile?.name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    gender: profile?.gender || '',
    password: profile?.password || '',
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [modalContent, setModalContent] = useState({});

  const [isModalVisible, setModalVisible] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [gender, setGender] = useState(data.gender); // true = male, false = female

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
  });

  useEffect(() => {
    setData({...data, gender: gender});
  }, [gender]);

  const handlerUpdateProfile = () => {
    if(validate?.name?.isValid && validate?.email?.isValid &&validate?.phone?.isValid) {
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

  const takePhotoFromCammara = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setShowUploadModal(false);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPhoto(image);
      setShowUploadModal(false);
    });
  };

  const handlerClickUploadAvatar = () => {
    uploadAvatarAPI(createFormData(photo), accessToken)
      .then(res => {
        setUploadSuccess(true);
      })
      .catch(err => console.log(err));
  };

  const handleChangeText = (value, field) => {
    if (field === 'name') {
      validateUsername(value, data, setData, validate, setValidate)
    } else if (field === 'email') {
      validateEmail(value, data, setData, validate, setValidate)
    } else if (field === 'phone') {
      validatePhoneNumber(value, data, setData, validate, setValidate)
    } else if (field === 'password') {
      validatePassword(value, data, setData, validate, setValidate)
    }
  };

  return (
    <UpdateProfileComponent
      profile={profile}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}
      modalContent={modalContent}
      updateSuccess={updateSuccess}
      photo={photo}
      data={data}
      uploadSuccess={uploadSuccess}
      validate={validate}
      showUploadModal={showUploadModal}
      gender={gender}
      setShowUploadModal={setShowUploadModal}
      handlerClickUploadAvatar={handlerClickUploadAvatar}
      setGender={setGender}
      handlerUpdateProfile={handlerUpdateProfile}
      takePhotoFromCammara={takePhotoFromCammara}
      choosePhotoFromLibrary={choosePhotoFromLibrary}
      handleChangeText={handleChangeText}
    />
  );
};

export default UpdateProfileScreen;
