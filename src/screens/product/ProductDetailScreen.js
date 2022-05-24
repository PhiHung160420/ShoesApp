import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetailComponent } from '../../components';
import { addProductToCartAction } from '../../redux/actions/cartAction';
import {
  fetchProductByIdAction, fetchProductsFavoriteAction, saveProductFavoriteAction
} from '../../redux/actions/productAction';
import { accessTokenSelector } from '../../redux/selectors/authSelector';
import { cartSelector } from '../../redux/selectors/cartSelector';
import {
  productByIdSelector,
  productFavoriteSelector
} from '../../redux/selectors/productSelector';
import {
  likeProductAPI,
  unLikeProductAPI
} from '../../services/productAPI';
import { saveShoppingCarts } from '../../utils/storage';

const ProducDetailScreen = ({route, navigation}) => {
  const {item} = route.params;

  const dispatch = useDispatch();

  const accessToken = useSelector(accessTokenSelector);

  const cartsInfo = useSelector(cartSelector);

  const productsFavorite = useSelector(productFavoriteSelector);

  const product = useSelector(productByIdSelector);

  const [productFavorite, setProductFavorite] = useState(false);

  const [showDescript, setShowDescript] = useState(false);

  const [sizeSelected, setSizeSelected] = useState('');

  const [showHidePopup, setShowHidePopup] = useState(false);

  useEffect(() => {
    dispatch(fetchProductByIdAction(item.id));

    if (typeof productsFavorite == 'object') {
      productsFavorite.forEach(e => {
        if (e.id == item.id) {
          setProductFavorite(true);
        }
      });
    }
  }, []);

  const handlerShowDescript = () => {
    setShowDescript(!showDescript);
  };

  const handlerSelectedSize = size => {
    setSizeSelected(size);
  };

  const handlerLikeOrUnLikeProduct = () => {
    if (productFavorite) {
      setProductFavorite(false);
      unLikeProductAPI(item.id, accessToken)
        .then(res => dispatch(fetchProductsFavoriteAction(accessToken)))
        .catch(err => console.log(err));
    } else {
      setProductFavorite(true);
      likeProductAPI(item.id, accessToken)
        .then(res => dispatch(fetchProductsFavoriteAction(accessToken)))
        .catch(err => console.log(err));
    }
  };

  const handlerAddProductToCart = product => {
    dispatch(addProductToCartAction(product));
    setShowHidePopup(true);
  };

  const handlerCheckoutProduct = product => {
    dispatch(addProductToCartAction(product));
    navigation.navigate('PaymentScreen');
  };

  const handlerClickGoToCart = () => {
    setShowHidePopup(false);
    navigation.navigate('CartScreen');
  };

  const handlerClickKeepShopping = () => {
    saveShoppingCarts(cartsInfo);
    setShowHidePopup(false);
  };

  return (
    <ProductDetailComponent 
      product={product}
      showDescript={showDescript}
      showHidePopup={showHidePopup}
      productFavorite={productFavorite}
      sizeSelected={sizeSelected}
      handlerClickKeepShopping={handlerClickKeepShopping}
      handlerShowDescript={handlerShowDescript}
      handlerSelectedSize={handlerSelectedSize}
      handlerAddProductToCart={handlerAddProductToCart}
      handlerClickGoToCart={handlerClickGoToCart}
      handlerLikeOrUnLikeProduct={handlerLikeOrUnLikeProduct}
      handlerCheckoutProduct={handlerCheckoutProduct}
    />
  );
};

export default ProducDetailScreen;
