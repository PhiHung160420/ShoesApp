import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchGetAllCategoryRequest } from '../../redux/actions/categoryAction';
import { handlerSetLoading } from '../../redux/actions/loadingAction';
import { actFetchGetAllProductRequest } from '../../redux/actions/productAction';
import { getAllCategorySelector } from '../../redux/selectors/categorySelector';
import { getLoadingSelector } from '../../redux/selectors/loadingSelector';
import {
  getAllProductsSelector,
  getProductsFavoriteSelector
} from '../../redux/selectors/productSelector';
import { getSessionSelector } from '../../redux/selectors/profileSelector';
import {HomeComponent} from '../../components';
import { logoutAction } from '../../redux/actions/authAction';
import { handlerSession } from '../../redux/actions/profileAction';
import { removeAccessTokenInStorage } from '../../utils/storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const navigation  = useNavigation();
  
  const session = useSelector(getSessionSelector);

  const isLoading = useSelector(getLoadingSelector);

  const productsFavorite = useSelector(getProductsFavoriteSelector);

  const listCate = useSelector(getAllCategorySelector);

  const listProducts = useSelector(getAllProductsSelector);

  const [showHidePopup, setShowHidePopup] = useState(false);

  const handlerShowHidePopup = () => {
    setShowHidePopup(!showHidePopup);
  };

  useEffect(() => {
    dispatch(actFetchGetAllCategoryRequest());
    dispatch(actFetchGetAllProductRequest());
  }, []);

  useEffect(() => {
    const loading = setTimeout(() => {
      dispatch(handlerSetLoading(false));
    }, 4000);

   /*  const handlerSession = setTimeout(() => {
      if (session == false) {
        handlerShowHidePopup();
      }
    }, 4500); */

    return () => {
      clearTimeout(loading);
      //clearTimeout(handlerSession);
    };
  }, [session]);

  const handlerSessionExpired = async () => {
    handlerShowHidePopup();
    await removeAccessTokenInStorage();
    dispatch(logoutAction(null));
    dispatch(handlerSession(true));
    dispatch(handlerSetLoading(true));
    navigation.navigate('LoginScreen');
  };

  return (
    <HomeComponent 
      isLoading={isLoading}
      productsFavorite={productsFavorite}
      listCate={listCate}
      listProducts={listProducts}
      showHidePopup={showHidePopup}
      handlerSessionExpired={handlerSessionExpired}
    />
  );
};

export default HomeScreen;