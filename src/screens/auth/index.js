import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { navigate, navigateAndSetToTop } from '../../navigations/service';
import { loginAction } from '../../redux/actions/authAction';
import { saveCartAction } from '../../redux/actions/cartAction';
import { loadingAction } from '../../redux/actions/loadingAction';
import { fetchOrderHistoryAction } from '../../redux/actions/orderAction';
import { fetchProductsFavoriteAction, saveProductFavoriteAction } from '../../redux/actions/productAction';
import { fetchProfileAction } from '../../redux/actions/profileAction';
import { getAccessToken, getShoppingCarts } from '../../utils/storage';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
  }, []);

  const loadData = async (accessToken) => {
    dispatch(fetchProfileAction(accessToken));
    dispatch(fetchOrderHistoryAction(accessToken));
    dispatch(fetchProductsFavoriteAction(accessToken));
    const shoppingCarts = await getShoppingCarts();
    if (shoppingCarts) {
      dispatch(saveCartAction(shoppingCarts));
    }
  };

  const checkAuth = async () => {
    const accessToken = await getAccessToken();

    if(accessToken) {
      await loadData(accessToken);
      dispatch(loadingAction(true));
      dispatch(loginAction(accessToken));
      navigateAndSetToTop('HomeScreen');
    } else {
      navigateAndSetToTop('SplashScreen');
    }
  };

  return <></>;
}

export default AuthScreen;