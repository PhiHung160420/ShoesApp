import COLORS from '../colors';

const darkTheme = {
  name: 'dark',
  backgroundColor: COLORS.secondary,
  subBackgroundColor: COLORS.lightGray,
  textColor: COLORS.white,
  flatlistbackgroundItem: COLORS.lightGray,
  shadowColor: COLORS.lightGray2,
  shadowImage: COLORS.gainsboro,
  cardBackgroundColor: COLORS.gray3,
  viewBackground: COLORS.darkgray,
  borderBottomColor: COLORS.white,
  tabbarBackgroundColor: COLORS.gray3,
  sizeBackgroundColor: COLORS.gainsboro,
  iconColor: COLORS.black,
  buttonBackgroundColor: COLORS.gray3,
  categoryShawdow: COLORS.lightGray1,
  searchBackgroundColor: COLORS.gainsboro,
  cartBackgroudColor: COLORS.gray,
};

const lightTheme = {
  name: 'light',
  backgroundColor: COLORS.lightGray3,
  subBackgroundColor: COLORS.gainsboro,
  textColor: COLORS.black,
  flatlistbackgroundItem: COLORS.silver,
  shadowColor: COLORS.gray3,
  shadowImage: COLORS.black,
  cardBackgroundColor: COLORS.silver,
  viewBackground: COLORS.gainsboro,
  borderBottomColor: COLORS.black,
  tabbarBackgroundColor: COLORS.white,
  sizeBackgroundColor: COLORS.yellow,
  iconColor: COLORS.white,
  buttonBackgroundColor: COLORS.gainsboro,
  categoryShawdow: COLORS.gray3,
  searchBackgroundColor: COLORS.white,
  cartBackgroudColor: COLORS.gainsboro,
};

const selectedTheme = lightTheme;

const THEMES = {
  darkTheme,
  lightTheme,
  selectedTheme
};

export default THEMES;
