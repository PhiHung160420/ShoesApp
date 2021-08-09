import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
import ThemeReducer from './themeReducer';
import ProfileReducer from './profileReducer';
import ProductReducer from './productReducer';
import CartReducer from './cartReducer';
import OrderReducer from './orderReducer';
import CategoryReducer from './categoryReducer';

const RootReducer = combineReducers({
  AuthReducer,
  ThemeReducer,
  ProfileReducer,
  ProductReducer,
  CartReducer,
  OrderReducer,
  CategoryReducer,
});

export default RootReducer;
