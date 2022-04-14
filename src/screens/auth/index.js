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
import { getAccessToken, getProductsFavorite, getShoppingCarts } from '../../utils/storage';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    checkAuth();
  }, []);

  const loadData = async (accessToken) => {
    const shoppingCarts = await getShoppingCarts();
    const productsFavorite = await getProductsFavorite();
    dispatch(fetchProfileAction(accessToken));
    dispatch(fetchOrderHistoryAction(accessToken));
    if (shoppingCarts) {
      dispatch(saveCartAction(shoppingCarts));
    }
    if(productsFavorite) {
      dispatch(saveProductFavoriteAction(productsFavorite));
    } else {
      dispatch(fetchProductsFavoriteAction(accessToken));
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