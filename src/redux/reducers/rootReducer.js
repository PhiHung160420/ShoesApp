import {combineReducers} from 'redux';
import AuthReducer from './authReducer';
import ThemeReducer from './themeReducer';
import ProfileReducer from './profileReducer';
import ProductReducer from './productReducer';
import CartReducer from './cartReducer';
import OrderReducer from './orderReducer';
import CategoryReducer from './categoryReducer';
import LoadingReducer from './loadingReducer';

const RootReducer = combineReducers({
  AuthReducer,
  ThemeReducer,
  ProfileReducer,
  ProductReducer,
  CartReducer,
  OrderReducer,
  CategoryReducer,
  LoadingReducer,
});

export default RootReducer;
