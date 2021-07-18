import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {COLORS, SIZES, icons} from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAppThemeSelector} from '../redux/selectors/themeSelector';
import {toggleTheme} from '../redux/actions/themeAction';
import appTheme from '../constants/theme';

const HeaderBar = ({children, nameIcon, customStyle}) => {
  // dispatch
  const dispatch = useDispatch();

  // theme get from store
  const appTheme = useSelector(getAppThemeSelector);

  // navigation
  const navigation = useNavigation();

  // handler when click theme button
  const toogleThemeHandler = () => {
    if (appTheme.name === 'dark') {
      dispatch(toggleTheme('light'));
    } else {
      dispatch(toggleTheme('dark'));
    }
  };

  // handler when click left button on headerbar
  const handlerClickIcon = () => {
    if (nameIcon) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.headerStyle, customStyle]}>
      <View style={styles.headerTopStyle}>
        {/* left icon */}
        <View>
          <TouchableOpacity
            style={[
              styles.leftIcon,
              {
                backgroundColor:
                  appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.white,
              },
            ]}
            onPress={handlerClickIcon}>
            <Ionicons
              name={nameIcon ? nameIcon : 'menu-outline'}
              color={COLORS.black}
              size={30}
            />
          </TouchableOpacity>
        </View>
        {/* left icon */}

        {/* Theme Button */}
        <View>
          <TouchableOpacity
            style={styles.themeButton}
            onPress={toogleThemeHandler}>
            {/* Light theme */}
            <View
              style={[
                styles.ThemeStyle,
                appTheme.name === 'light' ? styles.selectedLightModeStyle : {},
              ]}>
              <Image source={icons.sunny} style={styles.iconStyle} />
            </View>
            {/* Light theme */}

            {/* Dark theme */}
            <View
              style={[
                styles.ThemeStyle,
                appTheme.name === 'dark' ? styles.selectedNightModeStyle : {},
              ]}>
              <Image source={icons.night} style={styles.iconStyle} />
            </View>
            {/* Dark theme */}
          </TouchableOpacity>
        </View>
        {/* Theme Button */}
      </View>

      {/* SEARCH FORM */}
      {children}
      {/* SEARCH FORM */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 180,
    backgroundColor: COLORS.green,
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
    fontWeight: 'bold',
  },
  themeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGreen,
    marginRight: 10,
  },
  ThemeStyle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: 30,
    width: 30,
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
