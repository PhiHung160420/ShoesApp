import React, {useEffect, useState} from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  SearchScreen,
  CartScreen,
  FavoriteScreen,
  ProfileScreen,
} from '../screens/index';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {COLORS, SIZES, ICONS} from '../constants';
import {useSelector} from 'react-redux';
import {appThemeSelector} from '../redux/selectors/themeSelector';
import {cartSelector} from '../redux/selectors/cartSelector';

const Tab = createBottomTabNavigator();

const CustomTabbar = ({props, appTheme}) => {
  return (
    <View>
      <View style={[styles.customTabBar, {backgroundColor: appTheme.tabbarBackgroundColor}]}/>
      <BottomTabBar {...props} />
    </View>
  );
};

const CustomTabbarBottom = (props) => {
  const {
    onPress,
    containerStyle,
    isFloat,
    children,
    appTheme,
    numberCart,
  } = props;
    return (
      isFloat ? 
      <View style={styles.cartButtonContainer}>
        <Svg xmlns="http://www.w3.org/2000/svg" width={SIZES.size_90} height={SIZES.size_60} viewBox="0 0 90 61">
          <Path
            d="M0 0a38.742 38.742 0 0113 7c5.313 4.4 6.7 8.593 12 13 5.993 4.98 12.987 8 20 8s14.007-3.02 20-8c5.3-4.408 6.687-8.6 12-13a38.742 38.742 0 0113-7v61H0V0z"
            fill={appTheme.tabbarBackgroundColor}
            fillRule="evenodd"
          />
        </Svg>
        <TouchableOpacity style={styles.cartButton} onPress={onPress}>
          <View style={styles.cartStyle}>
            <Text style={styles.cartNumber}>{numberCart}</Text>
          </View>
          {children}
        </TouchableOpacity>
      </View> : 
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.tabbarButtonContainer, containerStyle, {backgroundColor: appTheme.tabbarBackgroundColor}]}>
          {children}
        </View>
      </TouchableWithoutFeedback>)
};

const tabbarOptions = {
  showLabel: false,
  style: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: 'transparent',
    borderTopColor: 'transparent',
    height: Platform.OS == 'android' ? SIZES.size_40 : SIZES.size_70,
  },
};

const RootTab = () => {
  const appTheme = useSelector(appThemeSelector);

  const [colorIcon, setColorIcon] = useState(COLORS.primary);

  const cartInfo = useSelector(cartSelector);

  useEffect(() => {
    if (appTheme.name === 'dark') {
      setColorIcon(COLORS.white);
    } else {
      setColorIcon(COLORS.black);
    }
  }, [appTheme]);

  return (
    <Tab.Navigator
      tabBarOptions={tabbarOptions}
      tabBar={props => <CustomTabbar props={props} appTheme={appTheme} />}
    >
      <Tab.Screen
        component={HomeScreen}
        name="HomeScreen"
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={ICONS.home} resizeMode="contain" style={[styles.iconStyle, {tintColor: focused ? COLORS.primary : colorIcon}]}/>),
          tabBarButton: props => (
            <CustomTabbarBottom
              {...props}
              containerStyle={{borderTopLeftRadius: SIZES.radius * 2}}
              appTheme={appTheme}
            />
          ),
        }}
      />

      <Tab.Screen
        component={SearchScreen}
        name="SearchScreen"
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={ICONS.search} resizeMode="contain" style={[styles.iconStyle, {tintColor: focused ? COLORS.primary : colorIcon}]}/>),
          tabBarButton: props => (
            <CustomTabbarBottom
              {...props}
              containerStyle={{marginRight: SIZES.size_6}}
              appTheme={appTheme}
            />
          ),
        }}
      />

      <Tab.Screen
        component={CartScreen}
        name="CartScreen"
        options={{
          tabBarIcon: () => (
            <Image source={ICONS.cart} resizeMode="contain" style={[styles.iconStyle, {tintColor: COLORS.white}]}/>),
          tabBarButton: props => (
            <CustomTabbarBottom
              {...props}
              isFloat={true}
              appTheme={appTheme}
              numberCart={cartInfo?.numberCart}
            />
          ),
        }}
      />

      <Tab.Screen
        component={FavoriteScreen}
        name="FavoriteScreen"
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={ICONS.heart} resizeMode="contain" style={[styles.iconStyle, {tintColor: focused ? COLORS.primary : colorIcon}]}/>),
          tabBarButton: props => (
            <CustomTabbarBottom
              {...props}
              containerStyle={{marginLeft: SIZES.size_6}}
              appTheme={appTheme}
            />
          ),
        }}
      />

      <Tab.Screen
        component={ProfileScreen}
        name="ProfileScreen"
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={ICONS.profile} resizeMode="contain" style={[styles.iconStyle, {tintColor: focused ? COLORS.primary : colorIcon}]}/>),
          tabBarButton: props => (
            <CustomTabbarBottom
              {...props}
              containerStyle={{borderTopRightRadius: SIZES.radius * 2}}
              appTheme={appTheme}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: SIZES.size_20,
  },
  iconStyle: {
    width: 35,
    height: 35,
  },
  cartButtonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cartButton: {
    top: -98,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customBtn: {
    flex: 1,
    height: 60,
    backgroundColor: COLORS.gray3,
  },
  cartStyle: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  cartNumber: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  tabbarButtonContainer: {
    flex: 1,
    height: SIZES.size_60,
  }
});

export default RootTab;
