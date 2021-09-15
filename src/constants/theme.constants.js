import {COLORS} from './colors.constants';

export const darkTheme = {
  name: 'dark',
  backgroundColor: COLORS.secondary,
  subBackgroundColor: COLORS.lightGray,
  textColor: COLORS.white,
  flatlistbackgroundItem: COLORS.lightGray,
  shadowColor: COLORS.lightGray2,
  cardBackgroundColor: COLORS.gray3,
  viewBackground: COLORS.darkgray,
  borderBottomColor: COLORS.white,
};

export const lightTheme = {
  name: 'light',
  backgroundColor: COLORS.lightGray3,
  subBackgroundColor: COLORS.gainsboro,
  textColor: COLORS.black,
  flatlistbackgroundItem: COLORS.silver,
  shadowColor: COLORS.gray3,
  cardBackgroundColor: COLORS.silver,
  viewBackground: COLORS.gainsboro,
  borderBottomColor: COLORS.black,
};

export const selectedTheme = lightTheme;
