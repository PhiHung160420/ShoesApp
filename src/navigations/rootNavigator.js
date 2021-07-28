import React, {useEffect, useState} from 'react';
import {
  SplashScreen,
  SignInScreen,
  SignUpScreen,
  CategoryScreen,
  ProducDetailScreen,
  PaymentScreen,
  UpdateProfile,
} from '../screens/index';
import RootTab from './rootTab';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessTokenSelector} from '../redux/selectors/authSelector';
import {getProductsFavoriteSelector} from '../redux/selectors/productSelector';
import {
  getAccessTokenFromStorage,
  getProductsFavoriteFromStorage,
  setProductsFavoriteToStorage,
} from '../utils/storage';
import {handlerSignIn} from '../redux/actions/authAction';
import {getProfile} from '../services/profileAPI';
import {handlerSetProfile} from '../redux/actions/profileAction';
import {getProductsFavoriteFromAPI} from '../services/productAPI';
import {hanlderSetProductFavorite} from '../redux/actions/productAction';

const Stack = createStackNavigator();

const RootNavigator = () => {
  // state xác thực đăng nhập thành công
  const [authSuccess, setAuthSuccess] = useState(false);

  // lấy access token từ redux
  const accessToken = useSelector(getAccessTokenSelector);

  console.log(accessToken);

  // dispatch
  const dispatch = useDispatch();

  // lấy access token từ asyncStorage lưu vào redux
  // lấy products favorite từ asyncStorage lưu vào redux
  useEffect(() => {
    const setAccessTokenToRedux = async () => {
      const accessStorage = await getAccessTokenFromStorage();

      if (accessStorage) {
        dispatch(handlerSignIn(accessStorage));
      }
    };

    const setProductsFavoriteToRedux = async () => {
      const productsFavorite = await getProductsFavoriteFromStorage();

      if (productsFavorite) {
        dispatch(hanlderSetProductFavorite(productsFavorite));
      }
    };

    setProductsFavoriteToRedux();

    setAccessTokenToRedux();
  }, []);

  useEffect(() => {
    const saveProductsFavoriteToStorage = async data => {
      return await setProductsFavoriteToStorage(data);
    };

    if (accessToken) {
      // xác thực đăng nhập thành công
      setAuthSuccess(true);

      // gọi api để lây profile
      // + Lưu vào redux
      getProfile(accessToken)
        .then(res => dispatch(handlerSetProfile(res.data.content)))
        .catch(err => console.log(err));

      // gọi api để lấy danh sách sản phẩm yêu thích
      // + lưu vào redux
      // + lưu vào asyncStorage
      getProductsFavoriteFromAPI(accessToken)
        .then(res => {
          dispatch(
            hanlderSetProductFavorite(res.data.content.productsFavorite),
          );
          saveProductsFavoriteToStorage(
            JSON.stringify(res.data.content.productsFavorite),
          );
        })
        .catch(err => console.log(err));
    } else {
      setAuthSuccess(false);
    }
  }, [accessToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {authSuccess ? (
          <>
            <Stack.Screen component={RootTab} name="HomeScreen" />
            <Stack.Screen component={CategoryScreen} name="CategoryScreen" />
            <Stack.Screen
              component={ProducDetailScreen}
              name="ProducDetailScreen"
            />
            <Stack.Screen component={PaymentScreen} name="PaymentScreen" />
            <Stack.Screen component={UpdateProfile} name="UpdateProfile" />
          </>
        ) : (
          <>
            <Stack.Screen component={SplashScreen} name="SplashScreen" />
            <Stack.Screen component={SignInScreen} name="SignInScreen" />
            <Stack.Screen component={SignUpScreen} name="SignUpScreen" />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
