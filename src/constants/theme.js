import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#37A372', // Green
  secondary: '#2C2C2C', // Gray

  lightGreen: '#98fb98',
  green: '#3cb371',
  yellow: '#F1CD7C',
  lightYellow: '#FFD88A',
  white: '#fff',
  white1: '#F1E6D8',
  lightGreen: '#7EBDA2',
  lightGreen2: '#BED2BB',
  red: '#D84035',
  red2: '#FF7363',
  black: '#000000',
  gray: '#6E6E6E',
  gray1: '#363636',
  gray2: '#4B4B4B',
  gray3: '#4D4D4D',
  darkgray: '#a9a9a9',
  lightGray: '#888888',
  lightGray2: '#707070',
  lightGray3: '#f0f0f0',
  gainsboro: '#dcdcdc',
  orange: '#ff6347',
  gold: '#ffd700',
  pink: '#D993B4',
  lightPink: '#F3DEE8',
  silver: '#c0c0c0',
  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparentBlack: 'rgba(0, 0, 0, 0.4)',
  transparent: 'transparent',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

/* export const FONTS = {
    largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
}; */

export const darkTheme = {
  name: 'dark',
  backgroundColor: COLORS.secondary,
  subBackgroundColor: COLORS.lightGray,
  textColor: COLORS.white,
  tabBackgroundColor: COLORS.lightGray,
  flatlistbackgroundItem: COLORS.lightGray,
  buttonBackgroundColor: COLORS.lightGray,
  shadowColor: COLORS.lightGray2,
  cardBackgroundColor: COLORS.gray3,
  bottomTabBarBackgroundColor: COLORS.gray3,
  headerColor: COLORS.yellow,
  viewBackground: COLORS.gainsboro,
  borderBottomColor: COLORS.white,
};

export const lightTheme = {
  name: 'light',
  backgroundColor: COLORS.lightGray3,
  subBackgroundColor: COLORS.gainsboro,
  textColor: COLORS.black,
  tabBackgroundColor: COLORS.yellow,
  flatlistbackgroundItem: COLORS.silver,
  buttonBackgroundColor: COLORS.silver,
  shadowColor: COLORS.gray3,
  cardBackgroundColor: COLORS.silver,
  bottomTabBarBackgroundColor: COLORS.lightYellow,
  headerColor: COLORS.red,
  viewBackground: COLORS.silver,
  borderBottomColor: COLORS.black,
};

export const selectedTheme = darkTheme;

const appTheme = {COLORS, SIZES, darkTheme, lightTheme};

export default appTheme;
