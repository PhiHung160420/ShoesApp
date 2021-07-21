import {
  TOGGLE_THEME_BEGIN,
  TOGGLE_THEME_SUCCESS,
  TOGGLE_THEME_FAILURE,
} from '../actions/actionType';
import {selectedTheme} from '../../constants/index';

const initialState = {
  appTheme: selectedTheme,
  error: null,
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME_BEGIN:
      return {
        ...state,
        error: null,
      };
    case TOGGLE_THEME_SUCCESS:
      return {
        ...state,
        appTheme: action.payload.selectedTheme,
      };
    case TOGGLE_THEME_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
