import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {
  removeAccessTokenInStorage,
  removeCartsInStorage,
} from '../../utils/storage';
import {handlerSignOut} from '../../redux/actions/authAction';
import {COLORS} from '../../constants/colors.constants';
import {SIZES} from '../../constants/sizes.constants';
import {useNavigation} from '@react-navigation/native';
import UpdateModal from '../../components/UpdateModal';
import {removeAllCarts} from '../../redux/actions/cartAction';
import * as Animatable from 'react-native-animatable';
import {handlerSetLoading} from '../../redux/actions/loadingAction';

const ToolProfle = ({item, index, profile}) => {
  // use dispatch
  const dispatch = useDispatch();

  // use navigation
  const navigation = useNavigation();

  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state show modal
  const [isModalVisible, setModalVisible] = useState(false);

  // state reload
  const [reload, setReload] = useState(null);

  useEffect(() => {
    navigation.addListener('focus', e => {
      if (e) {
        setReload(Math.random());
      }
    });
  }, []);

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
    dispatch(handlerSetLoading(true));
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

      <Animatable.View
        animation="fadeInLeft"
        duration={SIZES.duration + index * 150}
        key={reload}>
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
      </Animatable.View>
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
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
});

export default ToolProfle;
