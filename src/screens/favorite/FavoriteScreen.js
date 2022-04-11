import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteComponent } from '../../components';
import { hanldeSetProductFavorite } from '../../redux/actions/productAction';
import { getAccessTokenSelector } from '../../redux/selectors/authSelector';
import { getProductsFavoriteSelector } from '../../redux/selectors/productSelector';
import {
  getProductsFavoriteFromAPI,
  unLikeProductAPI
} from '../../services/productAPI';
import { setProductsFavoriteToStorage } from '../../utils/storage';

const FavoriteScreen = () => {;
  const dispatch = useDispatch();

  const accessToken = useSelector(getAccessTokenSelector);

  const productsFavorite = useSelector(getProductsFavoriteSelector);

  const saveProductsFavoriteToStorage = async data => {
    return await setProductsFavoriteToStorage(data);
  };

  const saveFavoriteToReduxAndStorage = token => {
    getProductsFavoriteFromAPI(token)
      .then(res => {
        const response = res?.data?.content?.productsFavorite;
        dispatch(hanldeSetProductFavorite(response));
        saveProductsFavoriteToStorage(JSON.stringify(response));
      })
      .catch(err => console.log(err));
  };

  const handlerRemoveProduct = productId => {
    unLikeProductAPI(productId, accessToken)
      .then(res => {
        saveFavoriteToReduxAndStorage(accessToken);
      })
      .catch(err => console.log(err));
  };

  return (
    <FavoriteComponent 
      productsFavorite={productsFavorite}
      handlerRemoveProduct={handlerRemoveProduct}
    />
  );
};

export default FavoriteScreen;
