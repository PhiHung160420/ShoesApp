import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteComponent } from '../../components';
import { saveProductFavoriteAction } from '../../redux/actions/productAction';
import { accessTokenSelector } from '../../redux/selectors/authSelector';
import { productFavoriteSelector } from '../../redux/selectors/productSelector';
import {
  getProductsFavoriteFromAPI,
  unLikeProductAPI
} from '../../services/productAPI';
import { saveProductsFavorite } from '../../utils/storage';

const FavoriteScreen = () => {;
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);

  const productsFavorite = useSelector(productFavoriteSelector);

  const saveFavoriteToReduxAndStorage = () => {
    getProductsFavoriteFromAPI(accessToken)
      .then(res => {
        const products = res?.data?.content?.productsFavorite;
        dispatch(saveProductFavoriteAction(products));
        saveProductsFavorite(products);
      })
      .catch(err => console.log(err));
  };

  const handlerRemoveProduct = productId => {
    unLikeProductAPI(productId, accessToken)
      .then(res => saveFavoriteToReduxAndStorage())
      .catch(error => console.log(error))
  };

  return (
    <FavoriteComponent 
      productsFavorite={productsFavorite}
      handlerRemoveProduct={handlerRemoveProduct}
    />
  );
};

export default FavoriteScreen;
