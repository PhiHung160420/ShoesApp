import {typeAction} from '../actions/actionType';
import {selectedTheme} from '../../constants/theme.constants';

const {TOGGLE_THEME_BEGIN, TOGGLE_THEME_SUCCESS, TOGGLE_THEME_FAILURE} =
  typeAction.themeActions;

const initialState = {
  appTheme: selectedTheme,
  error: null,
};

const ThemeReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case TOGGLE_THEME_BEGIN:
      return {
        ...state,
        error: null,
      };
    case TOGGLE_THEME_SUCCESS:
      return {
        ...state,
        appTheme: payload.selectedTheme,
      };
    case TOGGLE_THEME_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
