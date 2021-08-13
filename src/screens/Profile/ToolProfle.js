import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {
  removeAccessTokenInStorage,
  removeCartsInStorage,
} from '../../utils/storage';
import {handlerSignOut} from '../../redux/actions/authAction';
import {COLORS, SIZES} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import UpdateModal from '../../components/UpdateModal';
import {removeAllCarts} from '../../redux/actions/cartAction';
import {handlerLoading} from '../../redux/actions/loadingAction';

const ToolProfle = ({item, profile}) => {
  // use dispatch
  const dispatch = useDispatch();

  // use navigation
  const navigation = useNavigation();

  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state show modal
  const [isModalVisible, setModalVisible] = useState(false);

  // handler show modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // handler on click logout
  const handlerLogOut = async () => {
    await removeCartsInStorage();
    await removeAccessTokenInStorage();
    dispatch(removeAllCarts([]));
    dispatch(handlerSignOut(null));
    dispatch(handlerLoading(true));
  };

  //handler on press
  const handlerOnPress = async () => {
    if (item.id == 'logout') {
      await handlerLogOut();
    }
    if (item.id == 'profile') {
      navigation.navigate('UpdateProfile', {profile: profile});
    }
    if (item.id == 'lock') {
      toggleModal();
    }
    if (item.id == 'orderHistory') {
      navigation.navigate('OrderHistoryScreen');
    }
  };

  return (
    <>
      {/* MODAL */}
      {isModalVisible && (
        <UpdateModal
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
        />
      )}
      {/* MODAL */}

      <TouchableOpacity
        style={[
          styles.toolsContainer,
          {backgroundColor: appTheme.flatlistbackgroundItem},
        ]}
        onPress={handlerOnPress}>
        {/* PROFILE ICON */}
        <View style={styles.toolIconContainer}>
          <AntDesign
            name={item.icon}
            size={35}
            color={item.icon == 'logout' ? '#dc143c' : appTheme.textColor}
          />
        </View>
        {/* PROFILE ICON */}

        {/* PROFILE TEXT */}
        <View style={styles.toolContent}>
          <Text
            style={[
              styles.toolText,
              {color: item.icon == 'logout' ? '#dc143c' : appTheme.textColor},
            ]}>
            {item.text}
          </Text>
        </View>
        {/* PROFILE TEXT */}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  toolsContainer: {
    width: SIZES.width - 20,
    height: 80,
    borderRadius: SIZES.radius * 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
  },
  toolIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  toolText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ToolProfle;
