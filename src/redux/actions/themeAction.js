import { THEMES } from '../../constants';
import {typeAction} from './actionType';

const {TOGGLE_THEME_BEGIN, TOGGLE_THEME_SUCCESS, TOGGLE_THEME_FAILURE} = typeAction.themeActions;

export const toggleThemeBegin = () => {
  return {
    type: TOGGLE_THEME_BEGIN,
  };
};

export const toggleThemeSuccess = selectedTheme => {
  return {
    type: TOGGLE_THEME_SUCCESS,
    payload: {selectedTheme},
  };
};

export const toggleThemeFailure = error => {
  return {
    type: TOGGLE_THEME_FAILURE,
    payload: {error},
  };
};

export const toggleThemeAction = themeType => {
  return dispatch => {
    switch (themeType) {
      case 'dark':
        dispatch(toggleThemeSuccess(THEMES?.darkTheme));
        break;
      case 'light':
        dispatch(toggleThemeSuccess(THEMES?.lightTheme));
        break;
      default:
        dispatch(toggleThemeFailure({error: 'Invalid theme type'}));
    }
  };
};
