import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
import ThemeReducer from './themeReducer';
import ProfileReducer from './profileReducer';
import ProductReducer from './productReducer';

const RootReducer = combineReducers({
  AuthReducer,
  ThemeReducer,
  ProfileReducer,
  ProductReducer,
});

export default RootReducer;
