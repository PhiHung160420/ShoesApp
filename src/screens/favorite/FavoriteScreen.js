import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoriteComponent } from '../../components';
import { fetchProductsFavoriteAction, saveProductFavoriteAction } from '../../redux/actions/productAction';
import { accessTokenSelector } from '../../redux/selectors/authSelector';
import { productFavoriteSelector } from '../../redux/selectors/productSelector';
import { unLikeProductAPI } from '../../services/productAPI';

const FavoriteScreen = () => {;
  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);

  const productsFavorite = useSelector(productFavoriteSelector);

  const handlerRemoveProduct = productId => {
    unLikeProductAPI(productId, accessToken)
      .then(res => dispatch(fetchProductsFavoriteAction(accessToken)))
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
