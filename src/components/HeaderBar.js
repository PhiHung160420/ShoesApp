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
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../redux/selectors/themeSelector';
import {toggleTheme} from '../redux/actions/themeAction';
import appTheme from '../constants/theme';

const HeaderBar = () => {
  const dispatch = useDispatch();

  const appTheme = useSelector(getAppThemeSelector);

  const toogleThemeHandler = () => {
    if (appTheme.name === 'dark') {
      dispatch(toggleTheme('light'));
    } else {
      dispatch(toggleTheme('dark'));
    }
  };

  return (
    <SafeAreaView style={styles.headerStyle}>
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
            ]}>
            <Ionicons name="menu-outline" color={COLORS.black} size={30} />
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

      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchStyle,
            {
              borderColor:
                appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.white,
              backgroundColor:
                appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.white,
            },
          ]}>
          <TextInput
            style={[styles.searchInput]}
            placeholder="Find shoes"
            placeholderTextColor={COLORS.gray}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Feather
              name="search"
              size={25}
              color={appTheme.name == 'dark' ? 'black' : 'white'}
            />
          </TouchableOpacity>
        </View>
      </View>
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  searchStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: SIZES.width / 2 + 50,
    borderRadius: 20,
    height: 40,
    borderWidth: 1,
  },
  searchInput: {
    fontSize: 15,
    width: SIZES.width / 2,
    height: 40,
    paddingLeft: 15,
    color: COLORS.black,
  },
  searchButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});

export default HeaderBar;
