import React, {useEffect, useState} from 'react';
import {
  SplashScreen,
  SignInScreen,
  SignUpScreen,
  CategoryScreen,
  ProducDetailScreen,
  PaymentScreen,
  UpdateProfile,
  OrderHistoryScreen,
  OrderDetailScreen,
  MapScreen,
} from '../screens/index';
import RootTab from './rootTab';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessTokenSelector} from '../redux/selectors/authSelector';
import {getProductsFavoriteSelector} from '../redux/selectors/productSelector';
import {
  getAccessTokenFromStorage,
  getCartsFromStorage,
  getProductsFavoriteFromStorage,
  setProductsFavoriteToStorage,
} from '../utils/storage';
import {createStackNavigator} from '@react-navigation/stack';
import {handlerSignIn} from '../redux/actions/authAction';
import {getProfile} from '../services/profileAPI';
import {actFetchGetProfileRequest} from '../redux/actions/profileAction';
import {getProductsFavoriteFromAPI} from '../services/productAPI';
import {
  actFetchGetAllProductRequest,
  hanlderSetProductFavorite,
} from '../redux/actions/productAction';
import {addProductToCart, setCarts} from '../redux/actions/cartAction';
import {actFetchOrderHistoryRequest} from '../redux/actions/orderAction';
import {actFetchGetAllCategoryRequest} from '../redux/actions/categoryAction';
import {getLoadingSelector} from '../redux/selectors/loadingSelector';
import {handlerSetLoading} from '../redux/actions/loadingAction';

enableScreens();

const Stack = createSharedElementStackNavigator();

const RootNavigator = () => {
  // state xác thực đăng nhập thành công
  const [authSuccess, setAuthSuccess] = useState(false);

  // lấy access token từ redux
  const accessToken = useSelector(getAccessTokenSelector);

  // dispatch
  const dispatch = useDispatch();

  // lấy access token từ asyncStorage lưu vào redux
  // lấy products favorite từ asyncStorage lưu vào redux
  useEffect(() => {
    // access token
    const setAccessTokenToRedux = async () => {
      const accessStorage = await getAccessTokenFromStorage();

      if (accessStorage) {
        dispatch(handlerSignIn(accessStorage));
      }
    };

    // product favorite
    const setProductsFavoriteToRedux = async () => {
      const productsFavorite = await getProductsFavoriteFromStorage();

      if (productsFavorite) {
        dispatch(hanlderSetProductFavorite(productsFavorite));
      }
    };

    // save access token
    setAccessTokenToRedux();

    // save product favorite
    setProductsFavoriteToRedux();
  }, []);

  useEffect(() => {
    const saveProductsFavoriteToStorage = async data => {
      return await setProductsFavoriteToStorage(data);
    };

    // carts
    const setCartsToRedux = async () => {
      const carts = await getCartsFromStorage();
      const cartsObj = JSON.parse(carts);

      if (cartsObj?.carts.length) {
        dispatch(setCarts(cartsObj));
      }
    };

    if (accessToken) {
      // xác thực đăng nhập thành công
      setAuthSuccess(true);

      // gọi api để lấy profile và lưu vào redux
      dispatch(actFetchGetProfileRequest(accessToken));

      // gọi api để lấy order history lưu vào redux
      dispatch(actFetchOrderHistoryRequest(accessToken));

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

      setCartsToRedux();
    } else {
      setAuthSuccess(false);
    }
  }, [accessToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="modal">
        {authSuccess ? (
          <>
            <Stack.Screen component={RootTab} name="HomeScreen" />
            <Stack.Screen component={CategoryScreen} name="CategoryScreen" />
            <Stack.Screen
              component={ProducDetailScreen}
              name="ProducDetailScreen"
              options={() => ({
                gestureEnabled: false,
                transitionSpec: {
                  open: {animation: 'timing', config: {duration: 500}},
                  close: {animation: 'timing', config: {duration: 300}},
                },
              })}
            />
            <Stack.Screen component={PaymentScreen} name="PaymentScreen" />
            <Stack.Screen component={UpdateProfile} name="UpdateProfile" />
            <Stack.Screen
              component={OrderHistoryScreen}
              name="OrderHistoryScreen"
            />
            <Stack.Screen
              component={OrderDetailScreen}
              name="OrderDetailScreen"
            />
            <Stack.Screen component={MapScreen} name="MapScreen" />
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
