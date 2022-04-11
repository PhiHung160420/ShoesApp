import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image, SafeAreaView,
  StyleSheet, TouchableOpacity, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, ICONS, SIZES } from '../../../constants';
import { toggleTheme } from '../../../redux/actions/themeAction';
import { getAppThemeSelector } from '../../../redux/selectors/themeSelector';

const HeaderBar = ({children, nameIcon, customStyle}) => {
  const dispatch = useDispatch();

  const appTheme = useSelector(getAppThemeSelector);

  const navigation = useNavigation();

  const toogleThemeHandler = () => {
    if (appTheme.name === 'dark') {
      dispatch(toggleTheme('light'));
    } else {
      dispatch(toggleTheme('dark'));
    }
  };

  return (
    <SafeAreaView style={[styles.headerStyle, customStyle]}>
      <View style={styles.headerTopStyle}>
        <TouchableOpacity 
          style={[styles.leftIcon, { backgroundColor: appTheme.searchBackgroundColor}]}
          onPress={() => nameIcon ? navigation.goBack() : {}}
        >
          <Ionicons
            name={nameIcon ? nameIcon : 'menu-outline'}
            color={COLORS.black}
            size={30}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.themeButton} onPress={toogleThemeHandler}>
          <View style={[styles.ThemeStyle, appTheme.name === 'light' && styles.selectedLightModeStyle]}>
            <Image source={ICONS.sunny} style={styles.iconStyle} />
          </View>

          <View style={[styles.ThemeStyle, appTheme.name === 'dark' && styles.selectedNightModeStyle]}>
            <Image source={ICONS.night} style={styles.iconStyle} />
          </View>
        </TouchableOpacity>
      </View>

      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: SIZES.size_180,
    backgroundColor: COLORS.primary,
  },
  headerTopStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  appNameStyle: {
    fontSize: 25,
    color: COLORS.white,
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 10,
  },
  themeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    borderRadius: 20,
    backgroundColor: COLORS.lightGreen,
    marginRight: 10,
  },
  ThemeStyle: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 25,
    width: 25,
    tintColor: COLORS.white,
  },
  selectedNightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  selectedLightModeStyle: {
    borderRadius: 20,
    backgroundColor: COLORS.yellow,
  },
});

export default HeaderBar;
