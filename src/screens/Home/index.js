import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RemoveAccessToken} from '../../utils/storage';
import {handlerSignOut} from '../../redux/actions/authAction';
import {COLORS, icons, SIZES} from '../../constants/index';
import HeaderBar from '../../components/HeaderBar';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';

const HomeScreen = () => {
  //dispatch
  const dispatch = useDispatch();

  const appTheme = useSelector(getAppThemeSelector);

  // xử lý đăng xuất
  const handlerLogOut = async () => {
    await RemoveAccessToken();
    dispatch(handlerSignOut(null));
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <HeaderBar />
      {/* HEADER */}

      <ScrollView
        style={[
          styles.mainContainer,
          {
            backgroundColor:
              appTheme.name == 'dark' ? COLORS.secondary : COLORS.gainsboro,
          },
        ]}></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
});

export default HomeScreen;
