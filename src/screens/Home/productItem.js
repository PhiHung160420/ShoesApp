import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, SIZES} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import {getProductsFavoriteSelector} from '../../redux/selectors/productSelector';
import {
  getProductsFavoriteFromAPI,
  likeProductAPI,
  unLikeProductAPI,
} from '../../services/productAPI';
import {hanlderSetProductFavorite} from '../../redux/actions/productAction';
import {setProductsFavoriteToStorage} from '../../utils/storage';

const ProductItem = ({product, appTheme, isLiked}) => {
  // use navigation
  const navigation = useNavigation();

  // get access token from store
  const accessToken = useSelector(getAccessTokenSelector);

  // use dispatch
  const dispatch = useDispatch();

  // save products favorite to storage
  const saveProductsFavoriteToStorage = async data => {
    return await setProductsFavoriteToStorage(data);
  };

  // save products favorite to redux and store
  const saveFavoriteToReduxAndStorage = token => {
    getProductsFavoriteFromAPI(token)
      .then(res => {
        dispatch(hanlderSetProductFavorite(res.data.content.productsFavorite));
        saveProductsFavoriteToStorage(
          JSON.stringify(res.data.content.productsFavorite),
        );
      })
      .catch(err => console.log(err));
  };

  // handler when click like or unlike product
  const handlerClickLikeProduct = () => {
    if (isLiked) {
      unLikeProductAPI(product.id, accessToken)
        .then(res => saveFavoriteToReduxAndStorage(accessToken))
        .catch(err => console.log(err));
    } else {
      likeProductAPI(product.id, accessToken)
        .then(res => saveFavoriteToReduxAndStorage(accessToken))
        .catch(err => console.log(err));
    }
  };

  return (
    <SharedElement id={product.id}>
      <TouchableOpacity
        style={[
          styles.productItem,
          {
            backgroundColor:
              appTheme.name == 'dark' ? COLORS.gray3 : COLORS.gainsboro,
            shadowColor:
              appTheme.name == 'dark' ? COLORS.lightGray2 : COLORS.gray3,
          },
        ]}
        onPress={() =>
          navigation.navigate('ProducDetailScreen', {item: product})
        }>
        <View style={styles.productItemHeader}>
          <View style={styles.productPriceLeftContent}>
            <MatIcon name="attach-money" size={18} color={appTheme.textColor} />
            <Text
              style={[styles.productPriceText, {color: appTheme.textColor}]}>
              {product.price}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={handlerClickLikeProduct}>
            <FontAwesome
              name={isLiked == true ? 'heart' : 'heart-o'}
              color={isLiked ? COLORS.red : appTheme.textColor}
              size={25}
            />
          </TouchableOpacity>
        </View>

        <Image source={{uri: product.image}} style={[styles.productImage]} />

        <Text style={[styles.productName, {color: appTheme.textColor}]}>
          {product.name}
        </Text>
      </TouchableOpacity>
    </SharedElement>
  );
};

const styles = StyleSheet.create({
  productItem: {
    justifyContent: 'center',
    width: (SIZES.width - 60) / 2,
    paddingHorizontal: 10,
    height: 210,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 15,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 1,
  },
  productItemHeader: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPriceLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPriceText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  productImage: {
    width: 165,
    height: 120,
    alignSelf: 'center',
    shadowOffset: {
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  productName: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
    height: 50,
  },
});

export default ProductItem;
