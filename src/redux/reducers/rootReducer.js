import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
import ThemeReducer from './themeReducer';

const RootReducer = combineReducers({AuthReducer, ThemeReducer});

export default RootReducer;
