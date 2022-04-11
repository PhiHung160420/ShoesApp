import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDetailComponent } from '../../components';
import { addProductToCart } from '../../redux/actions/cartAction';
import {
  actFetchGetProductByIdRequest,
  hanldeSetProductFavorite
} from '../../redux/actions/productAction';
import { getAccessTokenSelector } from '../../redux/selectors/authSelector';
import { getCartsSelector } from '../../redux/selectors/cartSelector';
import {
  getProductByIdSelector,
  getProductsFavoriteSelector
} from '../../redux/selectors/productSelector';
import {
  getProductsFavoriteFromAPI,
  likeProductAPI,
  unLikeProductAPI
} from '../../services/productAPI';
import { setProductsFavoriteToStorage } from '../../utils/storage';

const ProducDetailScreen = ({route, navigation}) => {
  const {item} = route.params;

  const dispatch = useDispatch();

  const accessToken = useSelector(getAccessTokenSelector);

  const cartsInfo = useSelector(getCartsSelector);

  const productsFavorite = useSelector(getProductsFavoriteSelector);

  const product = useSelector(getProductByIdSelector);

  const [productFavorite, setProductFavorite] = useState(false);

  const [showDescript, setShowDescript] = useState(false);

  const [sizeSelected, setSizeSelected] = useState('');

  const [showHidePopup, setShowHidePopup] = useState(false);

  useEffect(() => {
    dispatch(actFetchGetProductByIdRequest(item.id));

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

  const saveProductsFavoriteToStorage = async data => {
    return await setProductsFavoriteToStorage(data);
  };

  const saveProductToReduxAndStorage = token => {
    getProductsFavoriteFromAPI(token)
      .then(res => {
        const response = res.data.content.productsFavorite;
        console.log('response: ', response);
        dispatch(hanldeSetProductFavorite(response));
        saveProductsFavoriteToStorage(JSON.stringify(response));
      })
      .catch(err => console.log(err));
  };

  const handlerLikeOrUnLikeProduct = () => {
    if (productFavorite) {
      setProductFavorite(false);
      unLikeProductAPI(item.id, accessToken)
        .then(res => {
          saveProductToReduxAndStorage(accessToken);
        })
        .catch(err => console.log(err));
    } else {
      setProductFavorite(true);
      likeProductAPI(item.id, accessToken)
        .then(res => {
          saveProductToReduxAndStorage(accessToken);
        })
        .catch(err => console.log(err));
    }
  };

  const handlerShowHidePopup = () => {
    setShowHidePopup(!showHidePopup);
  };

  const handlerAddProductToCart = product => {
    dispatch(addProductToCart(product));
    setShowHidePopup(true);
  };

  const handlerCheckoutProduct = product => {
    dispatch(addProductToCart(product));
    navigation.navigate('PaymentScreen');
  };

  const handlerClickGoToCart = () => {
    handlerShowHidePopup();
    navigation.navigate('CartScreen');
  };

  const handlerClickKeepShopping = () => {
    const handlerSaveCartToStorage = async data => {
      return await setCartsToStorage(data);
    };

    handlerSaveCartToStorage(JSON.stringify(cartsInfo));

    handlerShowHidePopup();
  };

  return (
    <ProductDetailComponent 
      product={product}
      showDescript={showDescript}
      showHidePopup={showHidePopup}
      productFavorite={productFavorite}
      sizeSelected={sizeSelected}
      handlerShowDescript={handlerShowDescript}
      handlerSelectedSize={handlerSelectedSize}
      handlerAddProductToCart={handlerAddProductToCart}
      handlerClickGoToCart={handlerClickGoToCart}
      handlerClickKeepShopping={handlerClickKeepShopping}
      handlerLikeOrUnLikeProduct={handlerLikeOrUnLikeProduct}
      handlerCheckoutProduct={handlerCheckoutProduct}
    />
  );
};

export default ProducDetailScreen;
