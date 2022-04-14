import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeComponent } from '../../components';
import { navigateAndSetToTop } from '../../navigations/service';
import { logoutAction } from '../../redux/actions/authAction';
import { fetchAllCategoryAction } from '../../redux/actions/categoryAction';
import { loadingAction } from '../../redux/actions/loadingAction';
import { fetchAllProductAction } from '../../redux/actions/productAction';
import { accessTokenSelector } from '../../redux/selectors/authSelector';
import { listCategorySelector } from '../../redux/selectors/categorySelector';
import { loadingSelector } from '../../redux/selectors/loadingSelector';
import {
  listProductSelector,
  productFavoriteSelector
} from '../../redux/selectors/productSelector';
import { clearDataStorage } from '../../utils/storage';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);

  const isLoading = useSelector(loadingSelector);

  const productsFavorite = useSelector(productFavoriteSelector);

  const listCate = useSelector(listCategorySelector);

  const listProducts = useSelector(listProductSelector);

  const [showHidePopup, setShowHidePopup] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategoryAction());
    dispatch(fetchAllProductAction());

    const loading = setTimeout(() => {
      dispatch(loadingAction(false));
    }, 4000);
    
    return () => clearTimeout(loading);

  }, []);

  const handlerSessionExpired = async () => {
    setShowHidePopup(false);
    await clearDataStorage();
    dispatch(logoutAction(null));
    navigateAndSetToTop('LoginScreen');
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