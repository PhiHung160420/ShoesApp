import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileSelector } from '../../redux/selectors/profileSelector';
import {ProfileComponent} from '../../components';
import { removeAccessTokenInStorage, removeCartsInStorage } from '../../utils/storage';
import { handlerSetLoading } from '../../redux/actions/loadingAction';
import {removeAllCarts} from '../../redux/actions/cartAction';
import {logoutAction} from '../../redux/actions/authAction';
import { getAccessTokenSelector } from '../../redux/selectors/authSelector';
import { changePasswordAPI } from '../../services/profileAPI';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const profile = useSelector(getProfileSelector);

  const accessToken = useSelector(getAccessTokenSelector);

  const [isModalVisible, setModalVisible] = useState(false);

  const [reload, setReload] = useState(null);

  const [entryPassword, setEntryPassword] = useState(false);

  const [showModalSuccess, setShowModalSuccess] = useState(false);

  const [validPassword, setValidPassword] = useState({
    isValid: true,
    msgError: '',
  });

  const [newPassword, setNewPassword] = useState({
    newPassword: '',
  });

  const [isChangePasswordSuccess, setIsChangePasswordSuccess] = useState(false);

  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
  });

  const handlerChangePassword = value => {
    if (value.trim().length >= 6) {
      setValidPassword({...validPassword, isValid: true});
      setNewPassword({
        newPassword: value,
      });
    } else {
      setValidPassword({
        isValid: false,
        msgError: 'Password at least 6 character length !',
      });
    }
  };

  const handlerClickChangePassword = () => {
    if (newPassword.newPassword.length !== 0 && validPassword.isValid) {
      changePasswordAPI(newPassword, accessToken)
      .then(res => {
        if (res.data.statusCode === 200) {
          setIsChangePasswordSuccess(true);
          setModalVisible(false);
        }
      })
      .catch(err => {
        setIsChangePasswordSuccess(false);
        setModalVisible(false);
      });
    } else {
      setValidPassword({
        isValid: false,
        msgError: 'Password at least 6 character length !',
      });
    }
  };

  useEffect(() => {
    navigation.addListener('focus', e => {
      if (e) {
        setReload(Math.random());
      }
    });
  }, []);

  useEffect(() => {
    if (isChangePasswordSuccess) {
      setShowModalSuccess(true);
      setModalContent({
        title: 'Successfully',
        message: 'Change password successfully !',
      });
    } else {
      setShowModalSuccess(false);
      setModalContent({
        title: 'Failed',
        message: 'Change password failed! Please try again.',
      });
    }
  }, [isChangePasswordSuccess]);

  const handlerLogOut = async () => {
    await removeCartsInStorage();
    await removeAccessTokenInStorage();
    dispatch(removeAllCarts([]));
    dispatch(logoutAction(null));
    dispatch(handlerSetLoading(true));
  };

  const onPressOption = async (item) => {
    if (item == 'logout') {
      await handlerLogOut();
    }
    if (item == 'profile') {
      navigation.navigate('UpdateProfileScreen', {profile: profile});
    }
    if (item == 'lock') {
      setModalVisible(true);
    }
    if (item == 'orderHistory') {
      navigation.navigate('OrderHistoryScreen');
    }
  };

  return (
    <ProfileComponent 
      profile={profile}
      isModalVisible={isModalVisible}
      reload={reload}
      entryPassword={entryPassword}
      modalContent={modalContent}
      showModalSuccess={showModalSuccess}
      validPassword={validPassword}
      isChangePasswordSuccess={isChangePasswordSuccess}
      onPressOption={onPressOption}
      setModalVisible={setModalVisible}
      setEntryPassword={setEntryPassword}
      handlerChangePassword={handlerChangePassword}
      handlerClickChangePassword={handlerClickChangePassword}
      setShowModalSuccess={setShowModalSuccess}
    />
  );
};

export default ProfileScreen;
