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
        setProductsFavoriteToStorage(
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
        navigation.navigate('ProducDetailScreen', {productId: product.id})
      }>
      <View style={styles.productItemHeader}>
        <View style={styles.productPriceLeftContent}>
          <MatIcon name="attach-money" size={18} color={appTheme.textColor} />
          <Text style={[styles.productPriceText, {color: appTheme.textColor}]}>
            {product.price}
          </Text>
        </View>
        <TouchableOpacity onPress={handlerClickLikeProduct}>
          <FontAwesome
            name={isLiked == true ? 'heart' : 'heart-o'}
            color={isLiked ? COLORS.red : appTheme.textColor}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: product.image}}
        style={[
          styles.productImage,
          {
            shadowColor:
              appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.black,
          },
        ]}
      />
      <Text style={[styles.productName, {color: appTheme.textColor}]}>
        {product.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    justifyContent: 'center',
    width: (SIZES.width - 80) / 2,
    paddingHorizontal: 10,
    height: 190,
    marginBottom: 25,
    marginHorizontal: 15,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPriceLeftContent: {
    flexDirection: 'row',
  },
  productPriceText: {
    fontWeight: 'bold',
  },
  productImage: {
    width: 150,
    height: 110,
    alignSelf: 'center',
    shadowOffset: {
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  productName: {
    fontSize: 16,
    height: 40,
    fontWeight: '500',
  },
});

export default ProductItem;
